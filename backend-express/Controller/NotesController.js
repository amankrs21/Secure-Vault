import Notes from "../Models/Notes";
import { currentUserID } from "../Middleware/AuthUser";
import { encrypt, decrypt } from "./PasswordController";


// function to get all the notes of the user
const getNotes = async (req, res) => {
    try {
        const { key } = req.body;
        if (!key) { return res.status(400).json({ message: "Please provide the key!" }); }
        const userID = await currentUserID(req, res);
        const notes = await Notes.find({ createdBy: userID });
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
