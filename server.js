require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ reply: "Please enter a prompt." });
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",  // free / cheap models
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error);
    res.json({ reply: "Error generating response. Check OpenRouter key or credits." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});