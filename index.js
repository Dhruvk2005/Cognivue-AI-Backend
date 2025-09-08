const express = require("express")
const cors = require("cors")
const PORT = 5000
require('dotenv').config();
const mongoose = require("mongoose")

const mongourl = process.env.MONGO_URL

const usersignup = require("./routes/authroutes")


const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/auth",usersignup)




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

