const validator = require("validator");

const UserNotes = require('../Models/Notes');
const { encrypt, decrypt } = require("../Service/Cipher.js");
const { currentUserID } = require("../Middleware/AuthUser.js");


// Validate if required fields are provided
const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            return { isValid: false, message: `${key} is required!` };
        }
    }
    return { isValid: true };
};


// validating key with previous note
const validateKey = async (userID, key) => {
    const previousNote = await UserNotes.findOne({ createdBy: userID });
    if (previousNote) {
        try {
            decrypt(previousNote.content, key);
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return true;
}


// function to get all the notes of the user
const getNotes = async (req, res) => {
    try {
        const { key } = req.body;
        const fieldValidation = validateFields({ key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const notes = await UserNotes.find({ createdBy: userID });
        try {
            notes.forEach(note => { note.content = decrypt(note.content, key); });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid Key!" });
        }
        return res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to add a new note
const addNote = async (req, res) => {
    try {
        const { title, note, key } = req.body;
        const fieldValidation = validateFields({ title, note, key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const validKey = await validateKey(userID, key);
        if (!validKey) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        const newNote = new UserNotes({
            title,
            content: encrypt(note, key),
            createdBy: userID
        });
        await newNote.save();
        return res.status(201).json({ message: "Note Added Successfully!", newNote });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to update a note by id
const updateNote = async (req, res) => {
    try {
        const { id, title, note, key } = req.body;
        const fieldValidation = validateFields({ id, title, note, key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await currentUserID(req, res);
        const validKey = await validateKey(userID, key);
        if (!validKey) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        if (!validator.isMongoId(id)) { return res.status(400).json({ message: "Invalid ID!" }); }
        const prevNote = await UserNotes.findOne({ _id: id, createdBy: userID });
        if (!prevNote) {
            return res.status(404).json({ message: "Note not found!" });
        }
        prevNote.title = title;
        prevNote.content = encrypt(note, key);
        await prevNote.save();
        return res.status(200).json({ message: "Note Updated Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to delete a note by id
const deleteNote = async (req, res) => {
    try {
        const { id } = req.body;
        const fieldValidation = validateFields({ id });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        if (!validator.isMongoId(id)) { return res.status(400).json({ message: "Invalid ID!" }); }
        const userID = await currentUserID(req, res);
        const deletedNote = await UserNotes.findOneAndDelete({ _id: id, createdBy: userID });
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found!" });
        }
        return res.status(200).json({ message: "Note Deleted Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// exporting functions
module.exports = { getNotes, addNote, updateNote, deleteNote };
