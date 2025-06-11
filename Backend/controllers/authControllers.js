const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config({ path: "../config.env" });

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(404).json({ status: "User must be logged in" });
    const decoded = await promisify(jwt.verify)(token, process.env.JWT);

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return res.status(404).json({ status: "Create new account" });
    }
    req.user = freshUser;

    next();
  } catch (err) {
    res.status(500).json({ status: err });
  }
};

exports.hashPassword = (password) => {
  return crypto
    .createHash("sha256")
    .update(process.env.SALT + password)
    .digest("hex");
};

exports.verifyPassword = (password, storedHash) => {
  const hashedInput = crypto
    .createHash("sha256")
    .update(process.env.SALT + password)
    .digest("hex");
  return hashedInput === storedHash;
};
