import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne } from 'typeorm';
import { Idea } from './IdeaEntity';

@Entity('detailed_idea')
export class DetailedIdea extends BaseEntity {
    @PrimaryGeneratedColumn()
    detailedIdeaId!: number;

    @Column({ nullable: false })
    startupTitle!: string;

    @Column({ type: 'text', nullable: false })
    description!: string;

    @Column({ type: 'text', nullable: false })
    businessPlanSummary!: string;

    @Column({ type: 'text', nullable: false })
    marketAnalysis!: string;

    @Column({ type: 'text', nullable: false })
    competitorAnalysis!: string;

    @Column({ type: 'text', nullable: false })
    revenueModel!: string;

    @Column({ type: 'text', nullable: false })
    swotSnapshot!: string;

    @OneToOne(() => Idea, idea => idea.detailedIdea)
    idea!: Idea;
}