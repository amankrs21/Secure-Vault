const express = require("express");

const VerifyUser = require("../Middleware/VerifyUser.js");
const ValidateKey = require("../Middleware/ValidateKey.js");
const { userLogin, userRegister, forgetPassword } = require("../Controller/UserController.js")
const { getNotes, addNote, updateNote, deleteNote } = require("../Controller/NotesController.js");
const { getVault, addVault, updateVault, deleteVault, soloVault } = require("../Controller/VaultController.js");


const router = express.Router();


// User Routes
router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.patch('/auth/forget', forgetPassword);


// Vaults Routes
router.post('/vaults', VerifyUser, getVault);
router.delete('/vault/delete', VerifyUser, deleteVault);
router.post('/vault/add', VerifyUser, ValidateKey, addVault);
router.post('/vault/solo', VerifyUser, ValidateKey, soloVault);
router.patch('/vault/update', VerifyUser, ValidateKey, updateVault);


// Notes Routes
router.delete('/note/delete', VerifyUser, deleteNote);
router.post('/notes', VerifyUser, ValidateKey, getNotes);
router.post('/note/add', VerifyUser, ValidateKey, addNote);
router.patch('/note/update', VerifyUser, ValidateKey, updateNote);


// test route
router.get('/test', (req, res) => { res.send({ message: "API is working fine" }); });

module.exports = router;
