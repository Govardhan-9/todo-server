// database
const sequelize = require("./config/database");

const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// Models
const User = require("./models/user.model");
const Todo = require("./models/todo.model");

// Routes
const authRoutes = require("./routes/auth.router");
const todoRoutes = require("./routes/todos.router");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use(todoRoutes);

// Making Relations with the help of sequelize
User.hasMany(Todo, { onDelete: "cascade" });
Todo.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => console.log(`Sever is running on PORT: ${PORT}`));
  })

  .catch((err) => {
    console.log(err);
  });
