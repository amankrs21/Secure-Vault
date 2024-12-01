const jwt = require("jsonwebtoken");

const UserDB = require("../Models/UserDB.js");

const SecretKey = process.env.SECRET_KEY;


const CurrentUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error("Token is not provided or invalid");
        }
        try {
            const decoded = jwt.verify(token, SecretKey);
            const user = await UserDB.findById(decoded?.id);
            if (!user) {
                throw new Error("Unauthorized");
            }
            return user._id;
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
        throw error;
    }
}

module.exports = CurrentUser;
