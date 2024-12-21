const NoteDB = require("../model/note.model.js");
const { encrypt, decrypt } = require("../service/cipher.service.js");
const { santizeId, validateFields } = require("../service/validation.service.js");


// function to get all the notes of the user
const getNotes = async (req, res) => {
    try {
        const { key, pageSize, offSet } = req.body;
        const fieldValidation = validateFields({ pageSize, offSet });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const notes = await NoteDB.find({ createdBy: req.currentUser }).skip(offSet).limit(pageSize);
        notes.forEach(note => { note.content = decrypt(note.content, key); });
        return res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to add a new note
const addNote = async (req, res) => {
    try {
        const { key, title, content } = req.body;
        const fieldValidation = validateFields({ title, content });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const newNote = new NoteDB({
            title,
            content: encrypt(content, key),
            createdBy: req.currentUser
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
        const { id, key, title, content } = req.body;
        const fieldValidation = validateFields({ id, title, content });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const prevNote = await NoteDB.findOne({ _id: santizeId(id), createdBy: req.currentUser });
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
        const id = req.query.id;
        const fieldValidation = validateFields({ id });
        if (!fieldValidation.isValid) {
            return res.status(400).json({ message: fieldValidation.message });
        }
        const deletedNote = await NoteDB.findOneAndDelete({ _id: santizeId(id), createdBy: req.currentUser });
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found!" });
        }
        return res.status(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// exporting functions
module.exports = { getNotes, addNote, updateNote, deleteNote };
