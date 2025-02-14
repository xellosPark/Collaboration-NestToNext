// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Auth } from '../auth/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        // 1️⃣ 이메일 중복 체크
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        // 2️⃣ User 테이블에 먼저 저장
        const user = new User();
        user.email = email;
        await this.userRepository.save(user); // 저장 후 ID 자동 생성됨

        // 3️⃣ Auth 테이블에 비밀번호 저장
        try {
            const auth = new Auth();
            auth.password = await bcrypt.hash(password, 10); // 비밀번호 해싱
            auth.user = user; // User와 연결
            await this.authRepository.save(auth);
        } catch (error) {
            console.error('비밀번호 해싱 중 오류 발생:', error);
            throw new InternalServerErrorException('비밀번호 저장에 실패했습니다.');
        }

        return user;
    }
}
