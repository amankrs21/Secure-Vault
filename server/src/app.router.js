const express = require("express");

const AuthSession = require("./app.middleware.js");
const { setVerifyText, resetPin, verifyText } = require("./controller/pin.controller.js");
const { userLogin, userRegister, forgetPassword } = require("./controller/user.controller.js");
const { getNotes, addNote, updateNote, deleteNote } = require("./controller/notes.controller.js");
const { getVault, addVault, updateVault, deleteVault, soloVault } = require("./controller/vault.controller.js");


const router = express.Router();


// User Routes
router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.patch('/auth/forget', forgetPassword);


// PIN Routes
router.get('/pin/reset', AuthSession, resetPin);
router.post('/pin/verify', AuthSession, verifyText);
router.post('/pin/setText', AuthSession, setVerifyText);


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


module.exports = router;
