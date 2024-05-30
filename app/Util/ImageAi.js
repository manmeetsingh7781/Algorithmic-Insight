import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI1 = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_AI_API);
const imageModel = genAI1.getGenerativeModel({ model: "gemini-pro-vision" });

function fileToGenerativePart(fileContent, mimeType) {
  return {
    inlineData: {
      data: fileContent,
      mimeType,
    },
  };
}

export async function imageToText(fileContent, mimeType, prompt) {
  const imageParts = [fileToGenerativePart(fileContent, mimeType)];
  const result = await imageModel.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  return response.text();
}
