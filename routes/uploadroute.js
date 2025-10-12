const express = require("express")
const multer = require("multer")
const path = require("path")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })


router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file


        const newUpload = new upload({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            userEmail: req.body.email || "guest"

        })

        await newUpload.save()


        console.log(req.file)
        res.json({
            success: true,
            message: "File uploaded successfully",
            data: newUpload
        })
    } catch (err) {
        res.json({
            status: 500,
            message: `Getting this error :`,
            error: err.message
        })


    }
})


router.get("/fetchUploads", async (req, res) => {
    try {
        const uploadData = await upload.find().sort({ uploadedAt: -1 });
        res.json(uploadData);

    } catch (err) {
        res.status(500).json({ message: "Error fetching uploads" })

    }
})

module.exports = router