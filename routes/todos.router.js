const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { isAuthorized } = require("../middleware/auth.middleware");

router.post("/todo", isAuthorized, todoController.createTodo);
router.get("/todo", isAuthorized, todoController.getTodos);
router.get("/todo/:id", isAuthorized, todoController.getTodo);
router.patch("/todo/:id", isAuthorized, todoController.updateTodo);
router.delete("/todo/:id", isAuthorized, todoController.deleteTodo);

module.exports = router;