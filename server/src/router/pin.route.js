const express = require("express");

const { setVerifyText, resetPin, verifyText } = require("../controller/pin.controller");


const pinRoute = express.Router();


// pin reset route
pinRoute.get('/reset', resetPin);

// pin verify route
pinRoute.post('/verify', verifyText);

// pin set text route
pinRoute.post('/setText', setVerifyText);


// exporting the pinRoute
module.exports = pinRoute;
