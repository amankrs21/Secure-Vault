const jwt = require("jsonwebtoken");

const UserDB = require("../Models/UserDB.js");

const SecretKey = process.env.SECRET_KEY;


const VerifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            return res.status(401).json({ message: "Token is not provided or invalid" });
        }
        try {
            const decoded = jwt.verify(token, SecretKey);
            const user = await UserDB.findById(decoded?.id);
            if (![1].includes(user.role)) {
                return res.status(401).json({ message: "You are not Authorised." });
            }
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            throw error;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = VerifyAdmin;
