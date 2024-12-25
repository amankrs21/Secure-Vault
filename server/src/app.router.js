const express = require("express");

const AuthSession = require("./app.middleware.js");
const { setVerifyText, resetPin, verifyText } = require("./controller/pin.controller.js");
const { userLogin, userRegister, forgetPassword } = require("./controller/user.controller.js");
const { getVault, addVault, updateVault, deleteVault, soloVault } = require("./controller/vault.controller.js");
const { getJournal, addJournal, updateJournal, deleteJournal, decryptJournal } = require("./controller/journal.controller.js");


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
router.delete('/vault/delete/:id', AuthSession, deleteVault);


// Journal Routes
router.get('/journals', AuthSession, getJournal);
router.post('/journal/add', AuthSession, addJournal);
router.post('/journal/:id', AuthSession, decryptJournal);
router.patch('/journal/update', AuthSession, updateJournal);
router.delete('/journal/delete/:id', AuthSession, deleteJournal);


module.exports = router;
