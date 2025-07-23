import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { generateDetailedIdea, generateStartupIdeaWithAnswers, generateStartupIdeaWithIdeaNAnswers } from "../services/GPTService";
import { IdeaService } from "../services/IdeaService";

const launchIdeaWithAnswers:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const { answers, previousDescriptions } = req.body;

        // 2. Generate start up idea
        const idea = await generateStartupIdeaWithAnswers(answers, previousDescriptions);
        res.json({ idea });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

const launchIdeaWithIdeaNAnswers:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const { answers, baseIdea } = req.body;

        // 2. Generate start up idea
        const idea = await generateStartupIdeaWithIdeaNAnswers(baseIdea, answers);
        res.json({ idea });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

const launchDetailedIdea:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const { idea } = req.body;

        // 2. Generate start up idea
        const detailedIdea = await generateDetailedIdea(idea);
        res.json({ detailedIdea });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

const createIdea:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const { token, answers } = req.body;

        // 2. Create Idea Answers
        const baseIdea = await IdeaService.createIdea(token, answers);
        const ideaId = baseIdea.ideaId;
        res.json({ ideaId });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

const createDetailedIdea:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const { id, detailed } = req.body;

        // 2. Create Idea Answers
        const isCreated = await IdeaService.creatDetailedeIdea(id, detailed);
        res.json({ isCreated });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

const getSpecificsummarizedIdea:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const ideaIdRaw = req.query.ideaId as string;
        const ideaId = Number(ideaIdRaw);

        // 2. Get specific summarized idea
        const summarizedIdea = await IdeaService.getSpecificSummarizedIdea(ideaId);
        res.json({ summarizedIdea });
    } catch (error) {
        console.error('Idea fetching error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to fetch idea.' });
    }
}

const getSpecificIdeaAnswers:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const ideaIdRaw = req.query.ideaId as string;
        const ideaId = Number(ideaIdRaw);

        // 2. Get specific idea answers
        const ideaAnswers = await IdeaService.getSpecificIdeaAnswers(ideaId);
        res.json({ ideaAnswers });
    } catch (error) {
        console.error('Idea fetching error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to fetch idea.' });
    }
}

const getSpecificDetail:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const ideaIdRaw = req.query.ideaId as string;
        const ideaId = Number(ideaIdRaw);

        // 2. Get specific detail
        const ideaDetail = await IdeaService.getSpecificIdeaDetail(ideaId);
        res.json({ ideaDetail });
    } catch (error) {
        console.error('Idea fetching error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to fetch idea.' });
    }
}

const deleteSpecificIdea:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }
        
        const ideaIdRaw = req.query.ideaId as string;
        const ideaId = Number(ideaIdRaw);

        // 2. Delete idea by id
        const isDeleted = await IdeaService.deleteIdeaById(ideaId);
        res.json({ isDeleted });
    } catch (error) {
        console.error('Idea generation error:', error);
        res.status(400).json({ error: (error as Error).message || 'Failed to generate idea.' });
    }
}

export { launchIdeaWithAnswers, launchIdeaWithIdeaNAnswers, launchDetailedIdea, createIdea, createDetailedIdea, getSpecificsummarizedIdea, getSpecificIdeaAnswers, deleteSpecificIdea, getSpecificDetail };