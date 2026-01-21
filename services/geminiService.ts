import { GoogleGenAI } from "@google/genai";

export const generateMagicCaption = async (imageDescription: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("No API Key found for Gemini");
      return "Just sharing a moment! ✨ #NextApp";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Write a short, engaging, and trendy social media caption for a photo described as: "${imageDescription}". Include 3 relevant hashtags. Keep it under 40 words. Use emojis.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Living the dream! ✨ #Next";
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Capturing the moment. 📸 #Life";
  }
};