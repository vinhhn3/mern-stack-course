const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const roleUser = asyncHandler(async (req, res, next) => {
  console.log(req.user.role[0]);
  if (req.user.role[0] === "user") next();
  else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const roleAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  if (req.user.role[0] === "admin") next();
  else {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect, roleUser, roleAdmin };
