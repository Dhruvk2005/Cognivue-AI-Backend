const express = require('express')
const SignUp = require('../controllers/signupcontroller')

const router = express.Router()

router.post('/signup', SignUp)

module.exports = router

