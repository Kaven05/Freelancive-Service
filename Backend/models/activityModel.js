const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    requied: [true],
  },
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true],
  },
  skills: {
    type: String,
    enum: ["Python", "ML", "Web Development", "Java"],
    required: [true, "Skills is req"],
  },
  count: {
    type: Number,
    default: 0,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
