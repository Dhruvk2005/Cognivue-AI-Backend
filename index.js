const express = require("express")
const cors  = require("cors")
const PORT = 3000


let app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
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

