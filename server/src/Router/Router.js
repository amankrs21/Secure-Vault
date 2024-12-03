const express = require("express");

const AuthSession = require("../Middleware/AuthSession.js");
const { setVerifyText, resetPin } = require("../Controller/PinController.js");
const { userLogin, userRegister, forgetPassword } = require("../Controller/UserController.js")
const { getNotes, addNote, updateNote, deleteNote } = require("../Controller/NotesController.js");
const { getVault, addVault, updateVault, deleteVault, soloVault } = require("../Controller/VaultController.js");


const router = express.Router();


// User Routes
router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.patch('/auth/forget', forgetPassword);


// PIN Routes
router.post('/pin/setText', AuthSession, setVerifyText);
router.patch('/pin/reset', AuthSession, resetPin);


// Vaults Routes
router.post('/vaults', AuthSession, getVault);
router.post('/vault/add', AuthSession, addVault);
router.post('/vault/solo', AuthSession, soloVault);
router.patch('/vault/update', AuthSession, updateVault);
router.delete('/vault/delete', AuthSession, deleteVault);


// Notes Routes
router.post('/notes', AuthSession, getNotes);
router.post('/note/add', AuthSession, addNote);
router.patch('/note/update', AuthSession, updateNote);
router.delete('/note/delete', AuthSession, deleteNote);


// test route
router.get('/test', (req, res) => { res.send({ message: "API is working fine" }); });

module.exports = router;
