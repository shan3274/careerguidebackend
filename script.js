// Import dependencies and middlewares

import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";

import { OpenAI } from "openai";

// Set up the server ////////////

const app = express();

app.use(cors());
app.use(express.json());

// Set up OpenAI endpoint

const openai = new OpenAI({
  apiKey: process.env.CHATBOT_KEY,
});

app.post("/chat", async (req, res) => {
  console.log(req.body);
  const { prompt } = req.body;
  console.log(prompt);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    max_tokens: 2048,
  });
  res.send(completion.choices[0].message);
  console.log(completion.choices[0].message);
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question

// Start the server ////////////////////

const port = "https://careerguide-blush.vercel.app/";
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
