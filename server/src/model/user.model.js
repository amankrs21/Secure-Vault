const mongo = require("mongoose");

const UserModel = new mongo.Schema({
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
    dateOfBirth: {
        type: String,
        required: true,
    },
    secretAnswer: {
        type: String,
        required: true,
    },
    textVerify: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongo.model('UserModel', UserModel);
