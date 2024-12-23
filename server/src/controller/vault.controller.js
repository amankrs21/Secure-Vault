const VaultDB = require("../model/vault.model.js");
const { encrypt, decrypt } = require("../service/cipher.service.js");
const { santizeId, validateFields } = require("../service/validation.service.js");


// function to decrypt the vault password by id
const soloVault = async (req, res, next) => {
    try {
        const id = req.query.id;
        const key = req.body.key;
        if (!id) { return res.status(400).json({ message: "Id is required!" }); }
        const vault = await VaultDB.findOne({ _id: santizeId(id), createdBy: req.currentUser });
        if (!vault) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        vault.password = decrypt(vault.password, key);
        return res.status(200).json(vault);
    } catch (error) {
        next(error);
    }
};


// function to get all the vault password of the user
const getVault = async (req, res, next) => {
    try {
        const { pageSize, offSet } = req.body;
        const fieldValidation = validateFields({ pageSize, offSet });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const vaults = await VaultDB.find({ createdBy: req.currentUser }).skip(offSet).limit(pageSize);
        return res.status(200).json(vaults);
    } catch (error) {
        next(error);
    }
};


// function to add a new vault password
const addVault = async (req, res, next) => {
    try {
        const { key, title, username, password } = req.body;
        const fieldValidation = validateFields({ title, username, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const vault = new VaultDB({
            title,
            username,
            password: encrypt(password, key),
            createdBy: req.currentUser
        });
        await vault.save();
        return res.status(201).json({ message: "Vault Added Successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to update a vault password by id
const updateVault = async (req, res, next) => {
    try {
        const { id, key, title, username, password } = req.body;
        const fieldValidation = validateFields({ id, title, username, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const vault = await VaultDB.findOne({ _id: santizeId(id), createdBy: req.currentUser });
        if (!vault) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        vault.title = title;
        vault.username = username;
        vault.password = encrypt(password, key);
        await vault.save();
        return res.status(200).json({ message: "Vault Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to delete a vault by id
const deleteVault = async (req, res, next) => {
    try {
        const id = req.query.id;
        const fieldValidation = validateFields({ id });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const deletedPassword = await VaultDB.findOneAndDelete({ _id: santizeId(id), createdBy: req.currentUser });
        if (!deletedPassword) {
            return res.status(404).json({ message: "Vault not found!" });
        }
        return res.status(204);
    } catch (error) {
        next(error);
    }
}


// exporting functions
module.exports = { soloVault, getVault, addVault, updateVault, deleteVault };
