const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Users = require('../Models/Users.js');
const UserVault = require('../Models/Password.js');
const SecretKey = process.env.SECRET_KEY;

const userLogin = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "User Not Found!!" });
        }

        if (!user.isActive) {
            return res.status(401).json({ message: "User is not Active!!" });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
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
            return res.status(200).json({ message: "Login Successful!!", token, user: customUser });
        } else {
            return res.status(401).json({ message: "Invalid Credentials!!" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


const userRegister = async (req, res) => {
    try {
        if (await Users.findOne({ email: req.body.email })) {
            return res.status(409).json({ message: "Email Already Exist!!" });
        }
        const user = new Users({
            "role": 0,
            "isActive": true,
            "name": req.body.name,
            "email": req.body.email,
            "dateOfBirth": req.body.dob,
            "answer": btoa(req.body.answer),
            "password": await bcrypt.hash(req.body.password, 10),
        })
        await user.save();
        return res.status(201).json({ message: "User Registerd Successfully!!" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

const getAllUsers = async (req, res) => {
    const users = Users.find({}).then((e) => {
        return res.status(200).json(e);
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
