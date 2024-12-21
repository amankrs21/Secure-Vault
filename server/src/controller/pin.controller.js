const UserDB = require("../model/user.model.js");
const NoteDB = require("../model/note.model.js");
const VaultDB = require("../model/vault.model.js");
const { encrypt } = require("../service/cipher.service.js");

const TextToVerify = "Hey SV, Verify me!";

const setVerifyText = async (req, res) => {
    try {
        if (!req.body.key) { return res.status(400).send("Key is required"); }
        const User = await UserDB.findById(req.currentUser);
        User.textVerify = encrypt(TextToVerify, req.body.key);
        await User.save();
        return res.status(200).json({
            message: "Your PIN has been used to encrypt a sample text, which will be stored for future verification."
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


const resetPin = async (req, res) => {
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
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// Export the functions
module.exports = { setVerifyText, resetPin };
