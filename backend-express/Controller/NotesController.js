const UserNotes = require('../Models/Notes');
const { currentUserID } = require("../Middleware/AuthUser.js");
const { encrypt, decrypt } = require("./PasswordController.js");


// function to get all the notes of the user
const getNotes = async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) { return res.status(400).json({ message: "Please provide the key!" }); }
        const userID = await currentUserID(req, res);
        const notes = await UserNotes.find({ createdBy: userID });
        try {
            notes.forEach(note => { note.note = decrypt(note.note, key); });
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
        if (!title || !note || !key) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }
        const userID = await currentUserID(req, res);
        const previousNote = await UserNotes.findOne({ createdBy: userID });
        if (previousNote) {
            try {
                decrypt(previousNote.note, key);
            } catch (error) {
                console.error(error);
                return res.status(400).json({ message: "Key is not able to decrypt the previous note!" });
            }
        }
        const encryptedNote = encrypt(note, key);
        const newNote = new Notes({
            title,
            note: encryptedNote,
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
        if (!id || !title || !note || !key) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }
        const userID = await currentUserID(req, res);
        const previousNote = await UserNotes.findOne({ createdBy: userID });
        if (previousNote) {
            try {
                decrypt(previousNote.note, key);
            } catch (error) {
                console.error(error);
                return res.status(400).json({ message: "Key is not able to decrypt the previous note!" });
            }
        }
        const encryptedNote = encrypt(note, key);
        const updatedNote = await UserNotes.findByIdAndUpdate(id, { title, note: encryptedNote }, { new: true });
        return res.status(200).json({ message: "Note Updated Successfully!", updatedNote });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// function to delete a note by id
const deleteNote = async (req, res) => {
    try {
        const { id, key } = req.body;
        if (!id || !key) {
            return res.status(400).json({ message: "Please provide all required fields!" });
        }
        const userID = await currentUserID(req, res);
        const note = await UserNotes.findOne({ _id: id, createdBy: userID });
        if (!note) {
            return res.status(404).json({ message: "Note not found!" });
        }
        await UserNotes.findByIdAndDelete(id);
        return res.status(200).json({ message: "Note Deleted Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


// exporting functions
module.exports = { getNotes, addNote, updateNote, deleteNote };
