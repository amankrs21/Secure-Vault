const VaultDB = require("../Models/VaultDB.js");
const CurrentUser = require("../Middleware/CurrentUser.js");
const { encrypt, decrypt } = require("../Service/Cipher.js");
const { santizeId, validateFields } = require("../Service/Validation.js");


// function to decrypt the vault password by id
const soloVault = async (req, res) => {
    try {
        const id = req.query.id;
        const key = req.body.key;
        if (!id) { return res.status(400).json({ message: "Id is required!" }); }
        const userID = await CurrentUser(req, res);
        const vault = await VaultDB.findOne({ _id: santizeId(id), createdBy: userID });
        if (!vault) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        vault.password = decrypt(vault.password, key);
        return res.status(200).json(vault);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to get all the vault password of the user
const getVault = async (req, res) => {
    try {
        const { pageSize, offSet } = req.body;
        const userID = await CurrentUser(req, res);
        const fieldValidation = validateFields({ pageSize, offSet });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const vaults = await VaultDB.find({ createdBy: userID }).skip(offSet).limit(pageSize);
        return res.status(200).json(vaults);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to add a new vault password
const addVault = async (req, res) => {
    try {
        const { key, title, username, password } = req.body;
        const fieldValidation = validateFields({ title, username, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        const vault = new VaultDB({
            title,
            username,
            password: encrypt(password, key),
            createdBy: userID
        });
        await vault.save();
        return res.status(201).json({ message: "Vault Added Successfully!", password });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to update a vault password by id
const updateVault = async (req, res) => {
    try {
        const { id, key, title, username, password } = req.body;
        const fieldValidation = validateFields({ id, title, username, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        const vault = await VaultDB.findOne({ _id: santizeId(id), createdBy: userID });
        if (!vault) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        vault.title = title;
        vault.username = username;
        vault.password = encrypt(password, key);
        await vault.save();
        return res.status(200).json({ message: "Vault Updated Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to delete a vault by id
const deleteVault = async (req, res) => {
    try {
        const id = req.query.id;
        const fieldValidation = validateFields({ id });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        const deletedPassword = await VaultDB.findOneAndDelete({ _id: santizeId(id), createdBy: userID });
        if (!deletedPassword) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        return res.status(204).json({ message: "Vault Deleted Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}


// exporting functions
module.exports = { soloVault, getVault, addVault, updateVault, deleteVault };
