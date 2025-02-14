// src/auth/entities/auth.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number; // 자동 생성되는 PK

    @Column()
    password: string; // 해싱된 비밀번호 저장

    @OneToOne(() => User, (user) => user.auth)
    user: User;
}