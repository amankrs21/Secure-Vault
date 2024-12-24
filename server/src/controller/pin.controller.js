const UserDB = require("../model/user.model.js");
const NoteDB = require("../model/note.model.js");
const VaultDB = require("../model/vault.model.js");
const { encrypt, decrypt } = require("../service/cipher.service.js");


const TextToVerify = "Hey SV, Verify me!";


const verifyText = async (req, res, next) => {
    try {
        if (!req.body.key) return res.status(400).send("Key is required");
        const User = await UserDB.findById(req.currentUser);
        if (!User.textVerify) return res.status(400).send({ message: "No sample text found for verification." });
        const decryptedText = decrypt(User.textVerify, req.body.key);
        if (decryptedText === TextToVerify) {
            return res.status(200).json({ message: "Encryption Key is verified successfully!" });
        }
        return res.status(400).json({ message: "Invalid Encryption Key!" });
    } catch (error) {
        next(error);
    }
};


const setVerifyText = async (req, res, next) => {
    try {
        if (!req.body.key) { return res.status(400).send("Key is required"); }
        const User = await UserDB.findById(req.currentUser);
        if (User.textVerify) {
            return res.status(400).send({
                message: "You have already set a sample text for verification. Please reset your PIN to set a new one."
            });
        }
        User.textVerify = encrypt(TextToVerify, req.body.key);
        await User.save();
        return res.status(200).json({
            message: "Your PIN has been used to encrypt a sample text, which will be stored for future verification."
        });
    } catch (error) {
        next(error);
    }
};


const resetPin = async (req, res, next) => {
    try {
        const User = await UserDB.findById(req.currentUser);
        User.verifyText = null;
        await User.save();
        const Note = await NoteDB.find({ user: User._id });
        Note.forEach(async (note) => {
            note.content = null;
            await note.save();
        });
        const Vault = await VaultDB.find({ user: User._id });
        Vault.forEach(async (vault) => {
            vault.password = null;
            await vault.save();
        });
        return res.status(200).json({ message: "All your encrypted data has been set to null" });
    } catch (error) {
        next(error);
    }
};


// Export the functions
module.exports = { verifyText, setVerifyText, resetPin };
