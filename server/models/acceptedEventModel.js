const mongoose = require("mongoose");
const User = require("../models/userModel");
const Event = require("../models/eventModel");

const acceptedEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  totalHours: { type: Number, required: false},
  checkInDateTime: { type: String, required: false },
  checkOutDateTime: { type: String, required: false },
});

module.exports = mongoose.model("AcceptedEvent", acceptedEventSchema);
