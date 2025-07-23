import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { buildDetailedIdeaPrompt, buildStartupPromptWithAnswers, buildStartupPromptWithIdeaNAnswers, parseStructuredIdeaResponse } from './PromptService';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
    
const { OPEN_API_KEY } = process.env;

const openai = new OpenAI({
    apiKey: OPEN_API_KEY,
});

export async function generateStartupIdeaWithAnswers(answers: string[], previousDescriptions: string[]): Promise<Record<string, string>> {
  if (!Array.isArray(answers) || answers.length !== 6) {
    throw new Error('Invalid input: Expected an array of 6 answers.');
  }
  const prompt = buildStartupPromptWithAnswers(answers, previousDescriptions);

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    max_tokens: 400,
  });

  const idea = response.choices[0].message?.content;
  if (!idea) throw new Error('No idea generated.');

  const parsedIdea = parseStructuredIdeaResponse(idea);
  return parsedIdea;
}

export async function generateStartupIdeaWithIdeaNAnswers(
    idea: string,
    answers: string[],
  ): Promise<Record<string, string>> {
    if (!Array.isArray(answers) || answers.length !== 6) {
      throw new Error('Invalid input: Expected an array of 6 answers.');
    }
  
    const prompt = buildStartupPromptWithIdeaNAnswers(idea, answers);
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 500,
    });
  
    const content = response.choices[0].message?.content;
    if (!content) throw new Error('No idea generated.');
  
    return parseStructuredIdeaResponse(content);
}

export async function generateDetailedIdea(
    idea: string
  ): Promise<Record<string, string>> {
    const prompt = buildDetailedIdeaPrompt(idea);
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = response.choices[0].message?.content;
    if (!content) throw new Error('No idea generated.');
  
    return parseStructuredIdeaResponse(content);
}