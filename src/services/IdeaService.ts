import { db } from "../configs/DbConfig";
import { SummarizedIdeaDto } from "../dtos/SummarizedIdeaDto";
import { DetailedIdea } from "../entities/DetailedIdeaEntity";
import { Idea } from "../entities/IdeaEntity";
import { User } from "../entities/UserEntity";
import { TokenService } from "./TokenService";

export const IdeaService = {
    getSpecificIdeaTitle: async ( ideaId: number ): Promise<string> => {
      const ideaRepo = db.getRepository(Idea);
      const idea = await ideaRepo.findOne({
        where: { ideaId },
      });

      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }

      const startupTitle =
        idea.detailedIdea && idea.detailedIdea.startupTitle
          ? idea.detailedIdea.startupTitle
          : "Not Completed";

      return startupTitle;
    },

    getSpecificSummarizedIdea: async ( ideaId: number ): Promise<SummarizedIdeaDto> => {
      const ideaRepo = db.getRepository(Idea);
      const idea = await ideaRepo.findOne({
        where: { ideaId },
        relations: ['detailedIdea'],
      });

      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }

      const startupTitle =
        idea.detailedIdea && idea.detailedIdea.startupTitle
          ? idea.detailedIdea.startupTitle
          : "Not Completed";

      return {
        ideaId: idea.ideaId,
        title: startupTitle,
        isCompleted: idea.isCompleted,
        createdAt: idea.createdAt 
      }
    },

    getSpecificIdeaAnswers: async ( ideaId: number ): Promise<string[]> => {
      const ideaRepo = db.getRepository(Idea);
      const idea = await ideaRepo.findOne({
        where: { ideaId },
      });

      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }

      return [
        idea.interestIdea,
        idea.targetAudience,
        idea.valueProposition,
        idea.commitmentLevel,
        idea.solutionFormat,
        idea.futureVision
      ]
    },

    getSpecificIdeaDetail: async ( ideaId: number ): Promise<Record<string, string>> => {
      const ideaRepo = db.getRepository(Idea);

      const idea = await ideaRepo.findOne({
        where: { ideaId },
        relations: ['detailedIdea'],
      });

      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }

      return {
        'Startup Title': idea.detailedIdea.startupTitle,
        'Description': idea.detailedIdea.description,
        'Business Plan Summary': idea.detailedIdea.businessPlanSummary,
        'Market Analysis': idea.detailedIdea.marketAnalysis,
        'Competitor Analysis': idea.detailedIdea.competitorAnalysis,
        'Revenue Model': idea.detailedIdea.revenueModel,
        'Swot Snapshot': idea.detailedIdea.swotSnapshot
      }
    },

    createIdea: async ( tokenVal: string, answers: string[] ): Promise<Idea> => {
        const payload = TokenService.verifyToken(tokenVal);
        const user = await User.findOne({
          where: { email: payload?.email },
          relations: ['ideas'],
        });
    
        if (!user) {
          throw new Error("User not found");
        }

        const idea = new Idea();
        idea.isCompleted = false;
        idea.interestIdea = answers[0];
        idea.targetAudience = answers[1];
        idea.valueProposition = answers[2];
        idea.commitmentLevel = answers[3];
        idea.solutionFormat = answers[4];
        idea.futureVision = answers[5];
        idea.user = user;
    
        return await idea.save();
    },

    creatDetailedeIdea: async ( ideaId: number, detailed: { startupTitle: string; description: string; businessPlanSummary: string; marketAnalysis: string; competitorAnalysis: string; revenueModel: string; swotSnapshot: string; } ): Promise<boolean> => {
      const ideaRepo = db.getRepository(Idea);
      const detailedRepo = db.getRepository(DetailedIdea);

      const idea = await ideaRepo.findOne({
        where: { ideaId },
        relations: ['detailedIdea'],
      });

      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }

      idea.isCompleted = true;
      await ideaRepo.save(idea);

      const newDetailed = detailedRepo.create({
        ...detailed,
        idea,
      });

      await detailedRepo.save(newDetailed);
      return newDetailed !== null;
    },

    deleteIdeaById: async (ideaId: number): Promise<boolean> => {
      const ideaRepo = db.getRepository(Idea);
      const detailedRepo = db.getRepository(DetailedIdea);
    
      const idea = await ideaRepo.findOne({
        where: { ideaId },
        relations: ['detailedIdea'],
      });
    
      if (!idea) {
        throw new Error(`Idea with id ${ideaId} not found`);
      }
    
      // 1. Save reference to detailedIdea before removing idea
      const detailedIdea = idea.detailedIdea;
    
      // 2. Delete Idea first
      await ideaRepo.remove(idea);
    
      // 3. Then delete detailedIdea
      if (detailedIdea) {
        await detailedRepo.remove(detailedIdea);
      }
    
      return true;
    }
}