const express = require("express");

const { getVault, addVault, updateVault, deleteVault, decryptVault } = require("../controller/vault.controller");


const vaultRoute = express.Router();


// fetch all vaults route
vaultRoute.post('/fetch', getVault);

// add vault route
vaultRoute.post('/add', addVault);

// decrypt vault route
vaultRoute.post('/:id', decryptVault);

// update vault route
vaultRoute.patch('/update', updateVault);

// delete vault route
vaultRoute.delete('/delete/:id', deleteVault);


// exporting the vaultRoute
module.exports = vaultRoute;
