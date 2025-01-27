import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private model: any;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateSolution(imageData: string): Promise<string> {
    if (!imageData) {
      throw new Error('No image data provided');
    }

    if (!imageData.startsWith('data:image/')) {
      throw new Error('Invalid image format');
    }

    try {
      const base64Data = imageData.split(',')[1];
      if (!base64Data) {
        throw new Error('Invalid image data format');
      }

      const result = await this.model.generateContent([
        "Analyze this image and provide a detailed solution to the problem shown. Format the response clearly.",
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
      ]);

      const response = await result.response;
      if (!response || !response.text) {
        throw new Error('Invalid response from Gemini API');
      }

      return response.text();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating solution:', error.message);
        throw new Error(`Failed to generate solution: ${error.message}`);
      }
      console.error('Error generating solution:', error);
      throw new Error('Failed to generate solution: Unknown error');
    }
  }
}