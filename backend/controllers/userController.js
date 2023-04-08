const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  if (!email || !password || !name || !role) {
    return res
      .status(400)
      .json({ message: "Invalid email or password or name" });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user._id);

  if (user) {
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 2 * 1000, //convert 2h to ms; maxAge uses miliseconds
    });
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role[0],
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const token = generateToken(user.id);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 2 * 1000, //convert 2h to ms; maxAge uses miliseconds
    });
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token,
      role: user.role[0],
    });
  } else {
    res.status(400);
    throw new Error("Wrong email or password");
  }
});

const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
