const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    userEmail: { type: String, default: "guest" },


    aiInsights: { type: String, default: "" },

    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Upload", uploadSchema);
