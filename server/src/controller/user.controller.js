const bcrypt = require("bcrypt");

const UserModel = require("../model/user.model.js");
const VaultModel = require("../model/vault.model.js");
const JournalModel = require("../model/journal.model.js");
const { validateFields } = require("../service/validation.service.js");


// Hash passwords
const hashPassword = async (password) => bcrypt.hash(password, 10);


// function to return user data
const getUserData = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.currentUser).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


// function to update user
const updateUser = async (req, res, next) => {
    try {
        const { name, dateOfBirth, secretAnswer } = req.body;
        const fieldValidation = validateFields({ name, dateOfBirth, secretAnswer });
        if (!fieldValidation.isValid)
            return res.status(400).json({ message: fieldValidation.message });

        const user = await UserModel.findById(req.currentUser);
        if (!user)
            return res.status(400).json({ message: "Bad Credentials!" });
        user.name = name;
        user.dateOfBirth = dateOfBirth;
        user.secretAnswer = btoa(secretAnswer);
        await user.save();
        return res.status(200).json({ message: "User Updated Successfully!!" });
    } catch (error) {
        next(error);
    }
};


// function to change password
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const fieldValidation = validateFields({ oldPassword, newPassword });
        if (!fieldValidation.isValid)
            return res.status(400).json({ message: fieldValidation.message });

        const user = await UserModel.findById(req.currentUser);
        if (!user)
            return res.status(400).json({ message: "Bad Credentials!" });
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Bad Credentials!" });
        user.password = await hashPassword(newPassword);
        await user.save();
        return res.status(200).json({ message: "Password Changed Successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to delete user and all its data
const deleteUser = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.currentUser);
        if (!user) {
            return res.status(400).json({ message: "Bad Credentials!" });
        }

        await VaultModel.deleteMany({ createdBy: req.currentUser });
        await JournalModel.deleteMany({ createdBy: req.currentUser });
        await user.deleteOne();
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};


// exporting functions
module.exports = { getUserData, updateUser, changePassword, deleteUser };
