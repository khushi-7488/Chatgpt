import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'


// Pass your API key directly or set GEMINI_API_KEY env var
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Joke related to computer science",
    });
    console.log(response.text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}


await main();