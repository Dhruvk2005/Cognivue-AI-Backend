const express = require("express")
const cors = require("cors")
const PORT = 5000
require('dotenv').config();
const mongoose = require("mongoose")

const mongourl = process.env.MONGO_URL

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://cognivue-ai.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

const aiRoute = require("./routes/ai")


const usersignup = require("./routes/authroutes")
const uploadFiles = require("./routes/uploadroute")




app.use("/api/auth", usersignup)
app.use("/api/upload", uploadFiles)
app.use("/api/ai",aiRoute)





mongoose.connect(mongourl).then(() => {
    console.log("Database is successfully connected ")

}).catch((err) => {
    console.log(`Database is not connected ${err}`)
})



app.get("/", (req, res) => {
    res.send("Hello guys welcome to Congnivue AI")
})




app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on ${PORT}`)
    }
    else {
        console.log("Unable to start server")
    }
})

