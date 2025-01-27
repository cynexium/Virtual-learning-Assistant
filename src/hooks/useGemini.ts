import { GeminiService } from '../services/gemini';

export const useGemini = () => {
  const analyzeProblem = async (imageData: string, apiKey: string): Promise<string> => {
    const gemini = new GeminiService(apiKey);
    return gemini.generateSolution(imageData);
  };

  return { analyzeProblem };
};