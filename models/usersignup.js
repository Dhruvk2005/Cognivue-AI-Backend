const mongoose = require('mongoose')

const UserSignupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("usersignup", UserSignupSchema)
