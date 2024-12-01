const mongo = require('mongoose');

const NoteDB = new mongo.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDB',
        required: true
    }
});

module.exports = mongo.model('NoteDB', NoteDB);
