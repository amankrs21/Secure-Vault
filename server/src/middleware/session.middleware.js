const jwt = require("jsonwebtoken");

const userModel = require("../model/user.model.js");
const { decrypt } = require("../service/cipher.service.js");


// function to check valid session
const validSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            return res.status(401).json({ message: "Token is not provided or invalid" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token has expired" });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid token" });
            }
            throw error;
        }

        const user = await userModel.findById(decoded?.id);
        if (!user) { return res.status(401).json({ message: "Unauthorized" }); }

        // pass it to the next middleware if needed
        // req.user = user;
        req.currentUser = user._id;

        let key = req.body?.key;
        if (key && user.textVerify && user.textVerify !== "") {
            try {
                decrypt(user.textVerify, key);
            } catch (error) {
                return res.status(400).json({ message: "Invalid Encryption Key!" });
            }
        }
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// export the function
module.exports = validSession;
