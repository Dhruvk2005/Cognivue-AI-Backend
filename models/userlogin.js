const mongoose = require("mongoose")

const UserLoginSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


moduel.exports = mongoose.model("UserLogin", UserLoginSchema)