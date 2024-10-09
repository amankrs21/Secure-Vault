const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const validator = require('validator');
const Users = require('../Models/Users.js');
const UserVault = require('../Models/Password.js');
const SecretKey = process.env.SECRET_KEY;

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All Fields are required!" });
    }

    try {
        const sanitizedEmail = validator.trim(validator.normalizeEmail(email));

        if (!validator.isEmail(sanitizedEmail)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }

        const user = await Users.findOne({ email: sanitizedEmail });
        if (!user) {
            return res.status(401).json({ message: "User Not Found!" });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: "User is not Active!" });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id, role: user.role }, SecretKey, { expiresIn: '30m' });

            user.lastLogin = Date.now();
            await user.save();

            const vault = await UserVault.find({ createdBy: user._id });

            const customUser = {
                email: user.email,
                name: user.name,
                answer: user.answer,
                dateOfBirth: user.dateOfBirth,
                firstLogin: vault.length === 0,
            };

            return res.status(200).json({ message: "Login Successful!", token, user: customUser });
        } else {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

const userRegister = async (req, res) => {
    const { name, email, dob, answer, password } = req.body;
    if (!name || !email || !dob || !answer || !password) {
        return res.status(400).json({ message: "All Fields are required!!" });
    }
    try {
        const sanitizedEmail = validator.trim(validator.normalizeEmail(email));
        if (!validator.isEmail(sanitizedEmail)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }
        if (await Users.findOne({ email: sanitizedEmail })) {
            return res.status(409).json({ message: "Email Already Exist!!" });
        }
        const user = new Users({
            role: 0,
            isActive: true,
            name: name,
            dateOfBirth: dob,
            email: email.toLowerCase(),
            answer: btoa(answer.toLowerCase()),
            password: await bcrypt.hash(req.body.password, 10),
        });
        await user.save();
        return res.status(201).json({ message: "User Registerd Successfully!!" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

const getAllUsers = async (req, res) => {
    const users = Users.find();
    await users.then((e) => {
        return res.status(200).json({ users: e });
    }).catch((e) => {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!!" })
    })
}

const resetPassword = async (req, res) => {
    const user = await Users.findById(req.body.id);
    user.password = await bcrypt.hash(user.email, 10);
    await user.save().then((e) => {
        return res.status(200).json({ message: "Password Reset Successfully!!" });
    }).catch((e) => {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!!" });
    })
}

const changeActiveState = async (req, res) => {
    const user = await Users.findById(req.body.id);
    user.isActive = !user.isActive;
    await user.save().then((e) => {
        return res.status(200).json({ message: "User Active State Changed Successfully!!" });
    }).catch((e) => {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!!" });
    })
}

module.exports = { userLogin, userRegister, getAllUsers, resetPassword, changeActiveState }
