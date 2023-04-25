const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // After validating fields
  try {
    const { name, email, password } = req?.body;
    const isUser = await User.findOne({ where: { email: email } });
    if (isUser) {
      throw new Error("User with this email already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({ name, email, password: hashedPassword });
  
      return res.status(201).json({
        status: 201,
        message: "Registered Successfully"
      });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    }

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      status: 200,
      message: "Login Successfully"
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      status: 200,
      message: "Logout Successfully"
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error?.message
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
}