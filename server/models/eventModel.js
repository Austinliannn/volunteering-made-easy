const mongoose = require("mongoose");
const User = require("../models/userModel");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, unique: true },
  cause: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  inCharge: { type: String, required: true },
  contact: { type: String, required: true },
  skill: {
    type: [String],
    default: [],
  },
  location: {
    type: [String],
    default: [],
  },
  completed: { type: Boolean, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  acceptedVolunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
