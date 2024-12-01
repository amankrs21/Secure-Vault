const mongo = require("mongoose");

const UserDB = new mongo.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    role: {
        type: Number,
        enum: [0, 1], // 0: user, 1: admin
        required: true,
    },
    isFirstLogin: {
        type: Boolean,
        default: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    secretAnswer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongo.model('UserDB', UserDB);
