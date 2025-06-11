const User = require("../models/userModel");
const authControllers = require("./authControllers");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res) => {
  try {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !(
        req.body.email &&
        strictEmailRegex.test(req.body.email) &&
        req.body.password &&
        req.body.name &&
        req.body.skills
      )
    ) {
      return res.status(404).json({ status: "Invalid details", data: {} });
    }
    const newUser = await User.create({
      name: req.body.name,
      skills: req.body.skills,
      email: req.body.email,
      password: authControllers.hashPassword(req.body.password),
    });
 
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "error",err });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(404).json({ status: "Must log in", data: {} });
    }
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!strictIdRegex.test(req.user.id)) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
    const doc = await User.findById(req.user.id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data: { doc } });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.getspecificUser = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(404).json({ status: "Must log in", data: {} });
    }
    const strictIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!strictIdRegex.test(req.params.id)) {
      return res.status(404).json({ status: "Invalid id", data: {} });
    }
    const doc = await User.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data: { doc } });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.getallUser = async (req, res) => {
  try {
    const doc = await User.find({}).select("+password");
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data: { doc } });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.signIn = async (req, res) => {
  try {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !(
        req.body.email &&
        strictEmailRegex.test(req.body.email) &&
        req.body.password
      )
    ) {
      return res.status(404).json({ status: "invalid", data: {} });
    }
    let doc = await User.findOne({ email: req.body.email }).select("+password");
    const token = signToken(doc._id);
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    // console.log(authControllers.hashPassword( req.body.password));

    if (authControllers.verifyPassword(req.body.password, doc.password)) {
      return res.status(201).json({ status: "success", token, data: { doc } });
    } else {
      return res.status(404).json({ status: "Enter correct password" });
    }
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};

exports.updateUser = async (req, res) => {
  
  try {
    
  if (!req.user.id) {
    return res.status(404).json({ status: "Must Log in", data: {} });
  }
  const strictIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!strictIdRegex.test(req.user.id)) {
    return res.status(404).json({ status: "Invalid id", data: {} });
  }
    const doc = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        userName: req.body.userName,
        skills: req.body.skills,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return res.status(404).json({ status: "not found" });
    }
    res.status(201).json({ status: "success", data: { doc } });
  } catch (err) {
    res.status(404).json({ status: "error", data: { err } });
  }
};
