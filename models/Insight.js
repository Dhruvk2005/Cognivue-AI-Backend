const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
    fileId: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
    insights: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Insight", insightSchema);
