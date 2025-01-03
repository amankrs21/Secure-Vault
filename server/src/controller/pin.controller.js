const UserModel = require("../model/user.model.js");
const VaultModel = require("../model/vault.model.js");
const JournalModel = require("../model/journal.model.js");
const { encrypt, decrypt } = require("../service/cipher.service.js");


const TextToVerify = "Hey SV, Verify me!";


// function to verify the encryption key
const verifyText = async (req, res, next) => {
    try {
        return res.status(200).json({ message: "Encryption Key is verified successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to set a sample text for verification
const setVerifyText = async (req, res, next) => {
    try {
        if (!req.body.key) { return res.status(400).send("Key is required"); }
        const User = await UserModel.findById(req.currentUser);
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


// function to reset the encryption key
const resetPin = async (req, res, next) => {
    try {
        const User = await UserModel.findById(req.currentUser);
        User.textVerify = null;
        await User.save();
        const Note = await JournalModel.find({ createdBy: User._id });
        Note.forEach(async (note) => {
            note.content = null;
            await note.save();
        });
        const Vault = await VaultModel.find({ createdBy: User._id });
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
