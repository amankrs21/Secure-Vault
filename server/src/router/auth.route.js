const express = require("express");

const { userLogin, userRegister, forgetPassword } = require("../controller/auth.controller");


const authRoute = express.Router();


// normal login route
authRoute.post('/login', userLogin);

// normal register route
authRoute.post('/register', userRegister);

// forget password route
authRoute.patch('/forget', forgetPassword);


// exporting the authRoute
module.exports = authRoute;
