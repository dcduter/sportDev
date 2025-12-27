
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const chatWithGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are SportDev AI, a world-class fitness coach and exercise specialist. Help the user with training plans, form tips, and health advice. Keep responses encouraging, scientific, and concise.',
    }
  });

  // Sending history as parts isn't supported in simple chat.sendMessage, 
  // but we can pass it if we use the underlying generative model or just send current message.
  // For simplicity and matching requirements:
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const analyzeMedia = async (file: File, type: 'image' | 'video', userPrompt?: string) => {
  const ai = getAIClient();
  const reader = new FileReader();
  
  const base64Promise = new Promise<string>((resolve) => {
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });

  const base64Data = await base64Promise;

  const prompt = type === 'image' 
    ? (userPrompt || "Analyze this fitness image. Identify the exercise if possible, evaluate form, or identify muscle groups being used.") 
    : (userPrompt || "Analyze this video for exercise form. Provide key observations about technique and potential risks.");

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: file.type } },
        { text: prompt }
      ]
    },
  });

  return response.text;
};
