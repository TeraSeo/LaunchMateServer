import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './UserEntity';
import { DetailedIdea } from './DetailedIdeaEntity';

@Entity('idea')
export class Idea extends BaseEntity {
    @PrimaryGeneratedColumn()
    ideaId!: number;

    @Column({ nullable: false })
    isCompleted!: boolean;

    @Column({ nullable: false, length: 81 })
    interestIdea!: string;

    @Column({ nullable: false, length: 81 })
    targetAudience!: string;

    @Column({ nullable: false, length: 81 })
    valueProposition!: string;

    @Column({ nullable: false, length: 81 })
    commitmentLevel!: string;

    @Column({ nullable: false, length: 81 })
    solutionFormat!: string;

    @Column({ nullable: false, length: 81 })
    futureVision!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, user => user.ideas)
    user!: User;

    @OneToOne(() => DetailedIdea, detailed => detailed.idea, { cascade: true })
    @JoinColumn()
    detailedIdea!: DetailedIdea;
}