const mongoose = require("mongoose")


const uploadSchema = new mongoose.Schema({

    fileName: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    userEmail: String
})


module.exports = mongoose.model("Upload", uploadSchema)