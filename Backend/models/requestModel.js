const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  activityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activity",
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;