const express = require("express");

const { getUserData, updateUser, changePassword, deleteUser } = require("../controller/user.controller");


const userRoute = express.Router();


// get user data route
userRoute.get('/fetch', getUserData);

// update user data route
userRoute.patch('/update', updateUser);

// delete user data route
userRoute.delete('/delete', deleteUser);

// change password route
userRoute.patch('/changePassword', changePassword);


// exporting the userRoute
module.exports = userRoute;
