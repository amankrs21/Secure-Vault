const TodoSchema = require("../Models/Todo.js");
const { currentUserID } = require("../Middleware/AuthUser.js");


const getTodos = async (req, res) => {
    const userID = await currentUserID(req, res);
    await TodoSchema.find({ createdBy: userID }).then((e) => {
        return res.status(200).json(e);
    }).catch((e) => {
        return res.status(500).json(e);
    });
}

const getTodoById = async (req, res) => {
    await TodoSchema.findById(req.params.id).then((e) => {
        return res.status(200).json(e);
    }).catch((e) => {
        return res.status(500).json(e);
    });
}

const addTodo = async (req, res) => {
    try {
        const userID = await currentUserID(req, res);
        const todo = new TodoSchema({
            title: req.body.title,
            description: req.body.description,
            createdBy: userID
        });
        await todo.save();
        return res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const markComplete = async (req, res) => {
    try {
        const todo = await TodoSchema.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();
        return res.status(200).json(updatedTodo);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const updateTodo = async (req, res) => {
    try {
        const todo = await TodoSchema.findById(req.body._id);
        if (!todo)
            return res.status(404).json({ message: 'Todo Not Found' });
        todo.title = req.body.title;
        todo.description = req.body.description;
        const updatedTodo = await todo.save();

        return res.status(200).json({ message: "Todo Updated Successfully!!", updatedTodo });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong!" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = TodoSchema.findById(req.params.id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found!!" })
        await todo.deleteOne();
        return res.status(200).json({ message: "Todo Deleted Successfully!!" })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { getTodos, getTodoById, addTodo, markComplete, updateTodo, deleteTodo };
