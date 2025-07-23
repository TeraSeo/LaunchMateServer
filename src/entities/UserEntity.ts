import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Idea } from './IdeaEntity';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ nullable: false })
    username!: string;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: true })
    otp?: string;

    @Column({ nullable: false })
    downloadCnt!: number;

    @OneToMany(() => Idea, idea => idea.user)
    ideas!: Idea[];
}