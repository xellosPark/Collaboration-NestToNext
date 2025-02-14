// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Auth } from '../auth/auth.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;  // 자동 생성되는 PK (회원 번호)

    @Column({ unique: true })
    email: string;

    @OneToOne(() => Auth, (auth) => auth.user, { cascade: true })
    @JoinColumn() // FK로 auth_id가 추가됨
    auth: Auth;
}

// User당 하나의 인증 정보 (Auth 테이블에서 User를 FK로 참조)
// 사용자의 인증 정보(비밀번호 해싱된 값, OAuth 토큰 등)를 따로 저장할 때 유용
// 예제: User 엔티티는 Auth를 가짐


// onDelete: 'CASCADE'를 추가하면 User가 삭제될 때 Auth 정보도 자동 삭제