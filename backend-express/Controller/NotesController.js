const validator = require("validator");

const NoteDB = require("../Models/NoteDB.js");
const CurrentUser = require("../Middleware/CurrentUser.js");
const { encrypt, decrypt } = require("../Service/Cipher.js");
const { validateFields, validateKey } = require("../Service/Validation.js");


// santize the id
const santizeId = (id) => {
    if (!validator.isMongoId(id)) { return null; }
    return validator.escape(id);
}


// function to get all the notes of the user
const getNotes = async (req, res) => {
    try {
        const { key, pageSize, offSet } = req.body;
        const fieldValidation = validateFields({ key, pageSize, offSet });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        if (!await validateKey(userID, key)) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        const notes = await NoteDB.find({ createdBy: userID }).skip(offSet).limit(pageSize);
        notes.forEach(note => { note.content = decrypt(note.content, key); });
        return res.status(200).json({ notes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to add a new note
const addNote = async (req, res) => {
    try {
        const { title, content, key } = req.body;
        const fieldValidation = validateFields({ title, note, key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        if (!await validateKey(userID, key)) {
            return res.status(400).json({ message: "Key is not valid!" });
        }
        const newNote = new NoteDB({
            title,
            content: encrypt(content, key),
            createdBy: userID
        });
        await newNote.save();
        return res.status(201).json({ message: "Note Added Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to update a note by id
const updateNote = async (req, res) => {
    try {
        const { id, title, content, key } = req.body;
        const fieldValidation = validateFields({ id, title, content, key });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const userID = await CurrentUser(req, res);
        if (!await validateKey(userID, key)) {
            return res.status(400).json({ message: "Key is not valid!" });
        }

        const prevNote = await NoteDB.findOne({ _id: santizeId(id), createdBy: userID });
        if (!prevNote) {
            return res.status(404).json({ message: "Note not found!" });
        }
        prevNote.title = title;
        prevNote.content = encrypt(content, key);
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
        const userID = await CurrentUser(req, res);
        const deletedNote = await NoteDB.findOneAndDelete({ _id: santizeId(id), createdBy: userID });
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
