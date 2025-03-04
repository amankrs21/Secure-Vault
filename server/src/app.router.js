const express = require("express");

const AuthSession = require("./app.middleware.js");
const { setVerifyText, resetPin, verifyText } = require("./controller/pin.controller.js");
const { getVault, addVault, updateVault, deleteVault, decryptVault } = require("./controller/vault.controller.js");
const { getJournal, addJournal, updateJournal, deleteJournal, decryptJournal } = require("./controller/journal.controller.js");
const { userLogin, userRegister, forgetPassword, getUserData, updateUser, changePassword, deleteUser } = require("./controller/user.controller.js");


const router = express.Router();


// User Routes
router.post('/auth/login', userLogin);
router.post('/auth/register', userRegister);
router.patch('/auth/forget', forgetPassword);
router.get('/auth/user', AuthSession, getUserData);
router.patch('/auth/user/update', AuthSession, updateUser);
router.delete('/auth/user/delete', AuthSession, deleteUser);
router.patch('/auth/user/changePassword', AuthSession, changePassword);


// PIN Routes
router.get('/pin/reset', AuthSession, resetPin);
router.post('/pin/verify', AuthSession, verifyText);
router.post('/pin/setText', AuthSession, setVerifyText);


// Vaults Routes
router.post('/vaults', AuthSession, getVault);
router.post('/vault/add', AuthSession, addVault);
router.post('/vault/:id', AuthSession, decryptVault);
router.patch('/vault/update', AuthSession, updateVault);
router.delete('/vault/delete/:id', AuthSession, deleteVault);


// Journal Routes
router.get('/journals', AuthSession, getJournal);
router.post('/journal/add', AuthSession, addJournal);
router.post('/journal/:id', AuthSession, decryptJournal);
router.patch('/journal/update', AuthSession, updateJournal);
router.delete('/journal/delete/:id', AuthSession, deleteJournal);


module.exports = router;
