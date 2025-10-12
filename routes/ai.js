const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();


const router = express.Router()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

router.post("/analyze", async (req, res) => {
    try {
        const { data } = req.body
        if (!data) {
            res.json({
                status: 400,
                error: "No data provided"
            })

        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


        const prompt = `You are a business data analyst AI. Analyze this business data and provide:
- Key insights
- Opportunities for improvement
- Suggestions to increase revenue or efficiency
Data: ${JSON.stringify(data, null, 2)}`;


        const result = await model.generateContent(prompt)
        const aiResponse = await result.response.text()
        const insights = aiResponse.split("\n").filter(line => line.trim() !== "");

        res.json({ insights: aiResponse })

    } catch (err) {
        console.error("🔥 AI Error Details:", err);
        res.status(500).json({
            status: 500,
            error: "AI analysis failed",
            details: err.message || err
        });
    }

})

module.exports = router;