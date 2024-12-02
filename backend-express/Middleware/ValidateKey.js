const NoteDB = require("../Models/NoteDB");
const VaultDB = require("../Models/VaultDB");
const CurrentUser = require("./CurrentUser");
const { decrypt } = require("../Service/Cipher");


// validating key with previous vault or note
const ValidateKey = async (req, res, next) => {
    try {
        const key = req.body.key;
        if (!key) { return res.status(400).json({ message: "Key is required!" }); }
        const userID = CurrentUser(req, res);
        const prevVault = await VaultDB.findOne({ createdBy: userID });
        if (prevVault && decryptSafely(prevVault.password, key)) {
            return next();
        }
        const previousNote = await NoteDB.findOne({ createdBy: userID });
        if (previousNote && decryptSafely(previousNote.content, key)) {
            return next();
        }
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const decryptSafely = (data, key) => {
    try {
        decrypt(data, key);
        return true;
    } catch {
        return false;
    }
};

module.exports = ValidateKey;
