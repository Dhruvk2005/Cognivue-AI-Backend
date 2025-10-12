const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const UploadModel = require("../models/Upload"); // <- make sure you created this model

const router = express.Router();

// 1️⃣ Setup Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 2️⃣ Upload + AI Analyze
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No file uploaded" });

        // Save basic info first
        const newUpload = new UploadModel({
            fileName: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            userEmail: req.body.email || "guest"
        });

        await newUpload.save();

        // Read file content
        const fileContent = fs.readFileSync(file.path, "utf8");

        // Send to AI for analysis
        const aiResponse = await axios.post(
            `${process.env.BACKEND_URL || "http://localhost:5000"}/api/ai/analyze`,
            { data: fileContent }
        );

        // Attach insights to upload record
        newUpload.aiInsights = aiResponse.data.insights || "No insights found.";
        await newUpload.save();

        res.json({
            success: true,
            message: "File uploaded and analyzed successfully",
            file: newUpload
        });
    } catch (err) {
        console.error("Error during upload+AI:", err);
        res.status(500).json({
            status: 500,
            message: "Upload or analysis failed",
            error: err.message
        });
    }
});

// 3️⃣ Fetch previous uploads
router.get("/fetchUploads", async (req, res) => {
    try {
        const uploads = await UploadModel.find().sort({ uploadedAt: -1 });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ message: "Error fetching uploads", error: err.message });
    }
});

module.exports = router;
