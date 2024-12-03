const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserDB = require("../model/UserDB.js");
const { validateFields } = require("../service/Validation.js");

const SecretKey = process.env.SECRET_KEY;


// Hash passwords
const hashPassword = async (password) => bcrypt.hash(password, 10);


// Find user by email
const findUserByEmail = async (email) => {
    const sanitizedEmail = validator.trim(validator.normalizeEmail(email));
    if (!validator.isEmail(sanitizedEmail)) {
        throw new Error("Invalid email format!");
    }
    return await UserDB.findOne({ email: sanitizedEmail });
};


// function to login user
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const fieldValidation = validateFields({ email, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        const token = jwt.sign({ id: user._id }, SecretKey, { expiresIn: "30m" });
        let userData = { name: user.name, isFirstLogin: user.textVerify ? false : true };
        return res.status(200).json({ message: "Login Successful!", token, user: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to register user
const userRegister = async (req, res) => {
    try {
        const { name, email, dob, answer, password } = req.body;
        const fieldValidation = validateFields({ name, email, dob, answer, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        if (await findUserByEmail(email)) {
            return res.status(409).json({ message: "Email Already Exist!!" });
        }

        const user = new UserDB({
            name,
            role: 0,
            dateOfBirth: dob,
            email: email.toLowerCase(),
            password: await hashPassword(password),
            secretAnswer: btoa(answer.toLowerCase()),
        });
        await user.save();
        return res.status(201).json({ message: "User Registered Successfully!!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to forget password
const forgetPassword = async (req, res) => {
    try {
        const { email, dob, answer, password } = req.body;
        const fieldValidation = validateFields({ email, dob, answer, password });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        if (user.dateOfBirth !== dob || btoa(answer.toLowerCase()) !== user.secretAnswer) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        user.password = await hashPassword(password);
        await user.save();
        return res.status(200).json({ message: "Password Changed Successfully!!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// exporting functions
module.exports = { userLogin, userRegister, forgetPassword };
