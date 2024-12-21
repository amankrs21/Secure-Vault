const mongo = require('mongoose');

const NoteDB = new mongo.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
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

module.exports = mongo.model('NoteDB', NoteDB);
