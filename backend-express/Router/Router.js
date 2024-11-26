const express = require("express");
const { verifyUser, verifyAdmin } = require("../Middleware/AuthUser.js");
const { userLogin, userRegister, forgetPassword, getAllUsers, resetPassword, changeActiveState } = require("../Controller/UserController.js")
const { getTodos, getTodoById, addTodo, markComplete, updateTodo, deleteTodo } = require("../Controller/TodoController.js");
const { getPasswords, addPassword, updatePassword, deletePassword } = require("../Controller/PasswordController.js");
const { getNotes, addNote, updateNote, deleteNote } = require("../Controller/NotesController.js");
const router = express.Router();

//  Auth User Routes
router.post('/auth/login', userLogin)
router.post('/auth/register', userRegister)
router.patch('/auth/forget', forgetPassword)
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

// Notes Routes
router.post('/notes', verifyUser, getNotes);
router.post('/note/add', verifyUser, addNote);
router.patch('/note/update', verifyUser, updateNote);
router.delete('/note/delete', verifyUser, deleteNote);

// test route
router.get('/test', (req, res) => {
    res.send({
        message: "API is working fine"
    });
})

module.exports = router;
