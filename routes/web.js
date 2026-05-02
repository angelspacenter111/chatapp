const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");


router.get("/", (req, res) => {
    res.render("home");
});

router.post("/apiendpoint", async (req, res) => {

    const question = req.body.message;

    const GEMINI_API_KEY = "AIzaSyClYlh07G0M8jvBjM_owwSL8NYnyHTBtFQ";
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        systemInstruction: "You are a helpful assistant. Every response should be short, concise, and within a maximum of 150–200 words. Avoid long explanations.",
        contents: [{ role: "user", parts: [{ text: `${question} (Answer in brief, under 200 words)` }] }],
        generationConfig: {
            maxOutputTokens: 300, // Takriban 450-500 words ke liye kaafi hai
            temperature: 0.5,
        },
    });

    await res.json({
        success: true, message: response.text
    });
});


module.exports = router;