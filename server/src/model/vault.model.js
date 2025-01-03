const mongo = require('mongoose');

const VaultModel = new mongo.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
});

module.exports = mongo.model('VaultModel', VaultModel);
