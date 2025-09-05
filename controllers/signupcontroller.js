const UserSignup = require('../models/usersignup')

const SignUp = async (req, res) => {
    try {
        let { name, email, password } = req.body

        const newuser = new UserSignup({ name, email, password })
        await newuser.save()

        res.json({
            status: 200,
            mssg: "New User Created",
            data: newuser
        })

    } catch (err) {
        res.json({
            status: 500,
            mssg: 'User is not created'

        })

    }
}

module.exports = SignUp