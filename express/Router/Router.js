const express = require("express");
const { verifyUser, verifyAdmin } = require("../Middleware/AuthUser.js");
const { userLogin, userRegister, getAllUsers, resetPassword, changeActiveState } = require("../Controller/UserController.js")
const { getTodos, getTodoById, addTodo, markComplete, updateTodo, deleteTodo } = require("../Controller/TodoController.js");
const { getPasswords, addPassword, updatePassword, deletePassword } = require("../Controller/PasswordController.js");
const router = express.Router();

router.post('/auth/login', userLogin)
router.post('/auth/register', userRegister)
router.patch('/auth/reset', verifyUser, resetPassword)
router.patch('/auth/active', verifyUser, verifyAdmin, changeActiveState)
router.get('/admin/users', verifyUser, verifyAdmin, getAllUsers)
router.get('/todo', verifyUser, getTodos);
router.get('/todo/:id', verifyUser, getTodoById);
router.post('/todo/add', verifyUser, addTodo);
router.patch('/todo/update', verifyUser, updateTodo)
router.patch('/todo/complete/:id', verifyUser, markComplete);
router.delete('/todo/delete/:id', verifyUser, deleteTodo)

// Password Routes
router.post('/passwords', verifyUser, getPasswords);
router.post('/password/add', verifyUser, addPassword);
router.patch('/password/update', verifyUser, updatePassword);
router.delete('/password/delete', verifyUser, deletePassword);

// test route
router.get('/test', (req, res) => {
    res.send({
        message: "API is working fine"
    });
})

module.exports = router;
