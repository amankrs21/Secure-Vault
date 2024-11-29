const validator = require("validator");

const UserVault = require('../Models/Password.js');
const { encrypt, decrypt } = require("../Service/Cipher.js");
const { currentUserID } = require("../Middleware/AuthUser.js");


// Validate if required fields are provided
const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return { isValid: false, message: `${key} is required!` };
        }
    }
    return { isValid: true };
};


// validating key with previous password
const validateKey = async (userID, key) => {
    const previousPass = await UserVault.findOne({ createdBy: userID });
    if (previousPass) {
        try {
            decrypt(previousPass.password, key);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return true;
}


// function to get all the passwords of the user
const getPasswords = async (req, res) => {
    try {
        const { key } = req.body;
        const fieldValidation = validateFields({ key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const passwords = await UserVault.find({ createdBy: userID });
        try {
            passwords.forEach(password => { password.password = decrypt(password.password, key); });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid Key!" });
        }
        return res.status(200).json(passwords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to add a new password
const addPassword = async (req, res) => {
    try {
        const { key, title, username, password: rawPassword } = req.body;
        const fieldValidation = validateFields({ key, title, username, password: rawPassword });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const validKey = await validateKey(userID, key);
        if (!validKey) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        const password = new UserVault({
            title,
            username,
            password: encrypt(rawPassword, key),
            createdBy: userID
        });
        await password.save();
        return res.status(201).json({ message: "Password Added Successfully!", password });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to update a password
const updatePassword = async (req, res) => {
    try {
        const { id, key, title, username, password: rawPassword } = req.body;
        const fieldValidation = validateFields({ id, key, title, username, password: rawPassword });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const validKey = await validateKey(userID, key);
        if (!validKey) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        if (!validator.isMongoId(id)) { return res.status(400).json({ message: "Invalid ID!" }); }
        const santizeId = validator.escape(id);
        const password = await UserVault.findOne({ _id: santizeId, createdBy: userID });
        if (!password) {
            return res.status(404).json({ message: "Password not found!" });
        }
        password.title = title;
        password.username = username;
        password.password = encrypt(rawPassword, key);
        await password.save();
        return res.status(200).json({ message: "Password Updated Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}


// function to delete a password by id
const deletePassword = async (req, res) => {
    try {
        const { id } = req.body;
        const fieldValidation = validateFields({ id });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        if (!validator.isMongoId(id)) { return res.status(400).json({ message: "Invalid ID!" }); }
        const santizeId = validator.escape(id);
        const userID = await currentUserID(req, res);
        const deletedPassword = await UserVault.findOneAndDelete({ _id: santizeId, createdBy: userID });
        if (!deletedPassword) {
            return res.status(404).json({ message: "Password not found!" });
        }
        return res.status(200).json({ message: "Password Deleted Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}


// exporting functions
module.exports = { getPasswords, addPassword, updatePassword, deletePassword };
