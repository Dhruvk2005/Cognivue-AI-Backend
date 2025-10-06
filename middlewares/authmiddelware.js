const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRETKEY || "Secret_key";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ status: 401, mssg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ status: 403, mssg: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
