const crypto = require('crypto');
const UserVault = require('../Models/Password.js');
const { currentUserID } = require("../Middleware/AuthUser.js");

const passwordKey = process.env.PASSWORD_KEY

// function to encrypt the password
const encrypt = (text, key) => {
    key = decodeURIComponent(encodeURIComponent(atob(key)));
    let finalKey = Buffer.from(key + passwordKey.slice(key.length), 'utf-8').slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', finalKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};


// function to decrypt the password
const decrypt = (text, key) => {
    key = decodeURIComponent(encodeURIComponent(atob(key)));
    let finalKey = Buffer.from(key + passwordKey.slice(key.length), 'utf-8').slice(0, 32);
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', finalKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};


// function to get all the passwords of the user
const getPasswords = async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) {
            return res.status(400).json({ message: "Please provide the key!" });
        }
        const userID = await currentUserID(req, res);
        const passwords = await UserVault.find({ createdBy: userID });
        try {
            passwords.forEach(password => {
                password.password = decrypt(password.password, key);
            });
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
        let encryptedPassword = "";
        const { key, title, username, password: rawPassword } = req.body;
        if (!key || !title || !username || !rawPassword) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }

        const userID = await currentUserID(req, res);
        const previousPassword = await UserVault.findOne({ createdBy: userID });
        if (previousPassword) {
            try {
                decrypt(previousPassword.password, key);
            } catch (error) {
                console.error(error);
                return res.status(400).json({ message: "Key is not able to decrypt the previous password!" });
            }
        }
        try {
            encryptedPassword = encrypt(rawPassword, key);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid Key!" });
        }
        const password = new UserVault({
            title,
            username,
            password: encryptedPassword,
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
        let encryptedPassword = "";
        const { id, key, name, username, password: rawPassword } = req.body;
        if (!id || !key || !name || !username || !rawPassword) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }
        const password = await UserVault.findById(id);
        if (!password) {
            return res.status(404).json({ message: "Password not found!" });
        }
        try {
            encryptedPassword = decrypt(rawPassword, key);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid Key!" });
        }
        password.name = name;
        password.username = username;
        password.password = encryptedPassword;
        await password.save();
        return res.status(200).json({ message: "Password Updated Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}


// function to delete a password
const deletePassword = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Please provide the password id!" });
        }
        const password = await UserVault.findById(id);
        if (!password) {
            return res.status(404).json({ message: "Password not found!" });
        }
        await Password.findByIdAndDelete(id);
        return res.status(200).json({ message: "Password Deleted Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

module.exports = { getPasswords, addPassword, updatePassword, deletePassword };
