const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } = process.env

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: "mysql",
  host: DATABASE_HOST,
});

module.exports = sequelize;
