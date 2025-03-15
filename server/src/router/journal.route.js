const express = require("express");

const { getJournal, addJournal, updateJournal, deleteJournal, decryptJournal } = require("../controller/journal.controller");


const journalRoute = express.Router();


// fetch all journals route
journalRoute.get('/fetch', getJournal);

// add journal route
journalRoute.post('/add', addJournal);

// decrypt journal route
journalRoute.post('/:id', decryptJournal);

// update journal route
journalRoute.patch('/update', updateJournal);

// delete journal route
journalRoute.delete('/delete/:id', deleteJournal);


// exporting the journalRoute
module.exports = journalRoute;
