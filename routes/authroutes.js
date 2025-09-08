const express = require('express')
const UserControl = require('../controllers/usercontroller')

const router = express.Router()

router.post('/signup', UserControl.CreateUser)
router.post("/login",UserControl.LoginUser)
module.exports = router

