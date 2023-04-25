const Todo = require("../models/todo.model");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Todo.create({ title, description, UserId: req.user.id });
    return res.status(201).json({
      status: 201,
      message: "Created Successfully"
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error?.message
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, UserId: req.user.id },
    });
    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found"
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: todo
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error?.message
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: todos
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error?.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req?.params?.id
    const todo = await Todo.update(req.body, { where: { id: id, UserId: req.user.id } })
    if (!todo[0]) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found"
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Updated Successfully"
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error?.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req?.params?.id
    const todo = await Todo.findOne({ where: { id: id, UserId: req.user.id } });
    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found"
      });
    }
    await todo.destroy();
    return res.status(200).json({
      status: 200,
      message: "Deleted Successfully"
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error?.message
    });
  }
};

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}