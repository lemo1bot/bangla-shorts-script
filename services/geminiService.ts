
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// IMPORTANT: API_KEY must be set in the environment variables for this to work.
// For example, in a Node.js environment or through build tool configurations.
// The prompt implies `process.env.API_KEY` is globally available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. The application will not be able to connect to Gemini API.");
  // Depending on the execution environment, this might not halt execution immediately,
  // but API calls will fail.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Using non-null assertion as per instructions, assuming API_KEY is set.
const modelName = 'gemini-2.5-flash-preview-04-17';

const PROMPT_TEMPLATE_START = `তুমি একজন দক্ষ বাংলা কন্টেন্ট রাইটার। ইউজার একটি নির্দিষ্ট বিষয় লিখবে, আর তোমার কাজ হবে সেই বিষয় নিয়ে ৩০ সেকেন্ড থেকে ১ মিনিটের মধ্যে একটি আকর্ষণীয়, মজাদার, আর শর্টস উপযোগী স্ক্রিপ্ট লেখা। স্ক্রিপ্টটি যেন গল্পের মতো হয়, শুরু, ক্লাইম্যাক্স ও একটি কিউরিয়াস/এনগেজিং সমাপ্তি থাকে। সাধারণ মানুষ যেন সহজেই বুঝতে পারে এমনভাবে লিখো। ইউজার যেই টপিক দেবে, সেটি ভালোভাবে ব্যাখ্যা করে, হুক লাইন দিয়ে শুরু করো।

ইউজার ইনপুট: "`;
const PROMPT_TEMPLATE_END = `"`;

export const generateScriptFromTopic = async (topic: string): Promise<string> => {
  if (!API_KEY) { // Redundant check if above error handling is sufficient, but good for clarity.
    throw new Error("API Key কনফিগার করা নেই। (API Key is not configured.)");
  }
  if (!topic.trim()) {
    throw new Error("বিষয় খালি রাখা যাবে না। (Topic cannot be empty.)");
  }

  const fullPrompt = `${PROMPT_TEMPLATE_START}${topic.trim()}${PROMPT_TEMPLATE_END}`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: fullPrompt,
    });
    
    const scriptText = response.text;

    if (!scriptText || scriptText.trim() === "") {
      throw new Error("Gemini API একটি খালি স্ক্রিপ্ট ফেরত দিয়েছে। (Gemini API returned an empty script.)");
    }
    return scriptText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      // You could add more specific error handling here if GoogleGenAIError provides more details
      // e.g. error.message might already contain useful info from the API
      let userFriendlyMessage = `স্ক্রিপ্ট তৈরি করতে সমস্যা হয়েছে: ${error.message}`;
      if (error.message.includes("API key not valid")) {
        userFriendlyMessage = "API Key টি সঠিক নয়। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন। (Invalid API Key. Please contact administrator.)";
      } else if (error.message.includes("quota")) {
        userFriendlyMessage = "API কোটা অতিক্রম করেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন। (API quota exceeded. Please try again later.)";
      }
      throw new Error(userFriendlyMessage);
    }
    throw new Error("স্ক্রিপ্ট তৈরি করার সময় একটি অজানা ত্রুটি ঘটেছে। (An unknown error occurred while generating the script.)");
  }
};
