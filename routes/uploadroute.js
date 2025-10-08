const express = require("express")
const multer = require("multer")
const path = require("path")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date, now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })


router.post("/", upload.single("file"), (req, res) => {
    try {
        console.log(req.file)
        req.json({
            message: "File uploaded successfully",
            file: req.file.filename
        })
    } catch (err) {
        res.json({
            status: 500,
            message: `Getting this error ${err}`,
            error: err.message
        })


    }
})

module.exports = router