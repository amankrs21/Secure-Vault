const JournalModel = require("../model/journal.model.js");
const { encrypt, decrypt } = require("../service/cipher.service.js");
const { santizeId, validateFields } = require("../service/validation.service.js");


// function to get all the journals of the user
const getJournal = async (req, res, next) => {
    try {
        const journals = await JournalModel.find({ createdBy: req.currentUser });
        journals.forEach(data => { data.content = null });
        return res.status(200).json(journals);
    } catch (error) {
        next(error);
    }
};


// function to add a new journal
const addJournal = async (req, res, next) => {
    try {
        const { key, title, content } = req.body;
        const fieldValidation = validateFields({ key, title, content });
        if (!fieldValidation.isValid)
            return res.status(400).json({ message: fieldValidation.message });

        const journal = new JournalModel({
            title,
            content: encrypt(content, key),
            createdBy: req.currentUser
        });
        await journal.save();
        return res.status(201).json({ message: "Journal Added Successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to update a journal by id
const updateJournal = async (req, res, next) => {
    try {
        const { id, key, title, content } = req.body;
        const fieldValidation = validateFields({ id, key, title, content });
        if (!fieldValidation.isValid)
            return res.status(400).json({ message: fieldValidation.message });

        const journal = await JournalModel.findOne({ _id: santizeId(id), createdBy: req.currentUser });
        if (!journal)
            return res.status(404).json({ message: "Journal not found!" });
        journal.title = title;
        journal.content = encrypt(content, key);
        await journal.save();
        return res.status(200).json({ message: "Journal Updated Successfully!" });
    } catch (error) {
        next(error);
    }
};


// function to delete a journal by id
const deleteJournal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const journal = await JournalModel.findOneAndDelete({ _id: santizeId(id), createdBy: req.currentUser });
        if (!journal)
            return res.status(404).json({ message: "journal not found!" });
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};


// function to decrypt the journal content by id
const decryptJournal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const key = req.body.key;
        const fieldValidation = validateFields({ id, key });
        if (!fieldValidation.isValid)
            return res.status(400).json({ message: fieldValidation.message });

        const journal = await JournalModel.findOne({ _id: santizeId(id), createdBy: req.currentUser });
        if (!journal)
            return res.status(404).json({ message: "Journal not found!" });
        if (journal.content) {
            journal.content = decrypt(journal.content, key);
        }
        return res.status(200).json(journal.content);
    } catch (error) {
        next(error);
    }
}


// exporting functions
module.exports = { getJournal, addJournal, updateJournal, deleteJournal, decryptJournal };
