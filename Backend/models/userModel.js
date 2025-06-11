const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is req"],
  },

  email: {
    type: String,
    required: [true, "Email is req"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is req"],
    minlength: 8,
    select: false,

  },
  skills: {
    type: [String],
    enum: ["Python", "ML", "Java"],
    required: [true, "Skills is req"],
  },
  rating: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

const User = mongoose.model("users", userschema);

module.exports = User;
