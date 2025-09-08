const usersignup = require('../models/usersignup')
const UserSignup = require('../models/usersignup')
const bcrypt = require("bcryptjs")

const CreateUser = async (req, res) => {
    try {
        let { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const newuser = new UserSignup({ name, email, password: hashedPassword })
        await newuser.save()

        res.json({
            status: 200,
            mssg: "New User Created",
            data: newuser
        })

    } catch (err) {
        res.json({
            status: 500,
            mssg: `user is not created ${err}`


        })

    }
}



const LoginUser = async (req, res) => {
    try {

        let { email, password } = req.body

        const user = await usersignup.findOne({ email })
        if (!user) {
            res.json({
                status: 404,
                mssg: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({
                status: 400,
                mssg: "Invalid password"
            })
        }


        res.json({
            status: 200,
            mssg: "Login successfull",
            data: {
                id: user.id,
                name: user.name,
                email: user.email

            }
        })



    } catch (err) {
        res.json({status:500,mssg:err})

    }

}



module.exports ={CreateUser,LoginUser}