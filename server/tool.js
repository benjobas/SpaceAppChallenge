require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Hardcodear la API Key aquí
});

const testOpenAI = async () => {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Hello!" }],
      model: "gpt-3.5-turbo",
    });
    console.log(response);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

testOpenAI();
