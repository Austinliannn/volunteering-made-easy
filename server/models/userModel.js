const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  organizationName: { type: String, required: false },
  contact: { type: String, required: true },
  link: { type: String, required: false },
  address: { type: String, required: false },
  skill: {
    type: [String],
    default: [],
  },
  location: {
    type: [String],
    default: [],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  type: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
