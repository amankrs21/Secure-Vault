const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserModel = require("../model/user.model.js");
const VaultModel = require("../model/vault.model.js");
const JournalModel = require("../model/journal.model.js");
const { validateFields } = require("../service/validation.service.js");

const SecretKey = process.env.SECRET_KEY;


// Hash passwords
const hashPassword = async (password) => bcrypt.hash(password, 10);


// Find user by email
const findUserByEmail = async (email) => {
    const sanitizedEmail = validator.trim(validator.normalizeEmail(email));
    if (!validator.isEmail(sanitizedEmail)) {
        throw new Error("Invalid email format!");
    }
    return await UserModel.findOne({ email: sanitizedEmail });
};


// function to login user
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const fieldValidation = validateFields({ email, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Bad Credentials!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Bad Credentials!" });
        }
        const token = jwt.sign({ id: user._id, name: user.name }, SecretKey, { expiresIn: "30m" });
        return res.status(200).json({
            message: "Login Successful!",
            token,
            isKeySet: !!user.textVerify
        });
    } catch (error) {
        next(error);
    }
};


// function to register user
const userRegister = async (req, res, next) => {
    try {
        const { name, email, dob, answer, password } = req.body;
        const fieldValidation = validateFields({ name, email, dob, answer, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        if (await findUserByEmail(email)) {
            return res.status(409).json({ message: "Email Already Exist!!" });
        }

        const user = new UserModel({
            name,
            role: 0,
            dateOfBirth: dob,
            email: email.toLowerCase(),
            secretAnswer: btoa(answer),
            password: await hashPassword(password),
        });
        await user.save();
        return res.status(201).json({ message: "User Registered Successfully!!" });
    } catch (error) {
        next(error);
    }
};


// function to forget password
const forgetPassword = async (req, res, next) => {
    try {
        const { email, dob, answer, password } = req.body;
        const fieldValidation = validateFields({ email, dob, answer, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Bad Credentials!" });
        }
        if (user.dateOfBirth !== dob || btoa(answer.toLowerCase()) !== user.secretAnswer) {
            return res.status(400).json({ message: "Bad Credentials!" });
        }
        user.password = await hashPassword(password);
        await user.save();
        return res.status(200).json({ message: "Password Changed Successfully!" });
    } catch (error) {
        next(error);
    }
};


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
module.exports = { userLogin, userRegister, forgetPassword, getUserData, updateUser, changePassword, deleteUser };
