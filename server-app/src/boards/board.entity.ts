import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number; // 게시판 ID

    @Column()
    title: string; // 게시판 제목

    @Column()
    description: string; // 게시판 설명

    @Column({ default: false })
    isPublic: boolean; // 공개 여부, 기본값은 false

    @Column({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;
}