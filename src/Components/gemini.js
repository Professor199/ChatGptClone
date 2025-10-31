const apiKey = "AIzaSyCc5yHdLiKDHkf8Uufce5zZM9ussbdfLXw";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);

export async function main(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or gemini-1.5-pro or gemini-2.5
  
const result = await model.generateContent({
  contents: [{ parts: [{ text: `${prompt}` }] }]
});

  const response = result.response;
  const text =  response.text();

  console.log(text);
  return text;
}


