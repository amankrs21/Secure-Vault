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
    isUserNew: {
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
