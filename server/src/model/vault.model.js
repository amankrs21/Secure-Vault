const mongo = require('mongoose');

const VaultModel = new mongo.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'UserDB',
        required: true
    }
});

module.exports = mongo.model('VaultModel', VaultModel);
