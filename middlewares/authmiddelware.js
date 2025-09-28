const jwt  = require ("jsonwebtoken")


const authMiddleware =(req,res, next)=> {
    const authHeader = req.header["authorization"]
    const token = authHeader && authHeader.split("")[1]

    if(!token){
       return res.json({
            status:401,
            mssg:"No token provided"
        })
    }

    jwt.verify(token , process.env.JWT_SECRETKEY || "Secret_key",(err,decoded)=>{
        if(err){
            res.status(403).json({mssg:"Invalid token"})
        }
        req.user = decoded
        next();
    })

}

module.exports = authMiddleware