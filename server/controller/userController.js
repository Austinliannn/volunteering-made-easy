const User = require("../models/userModel");
const Event = require("../models/eventModel");
const jwt = require('jsonwebtoken');

async function getUser(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Volunt33ringM@d3Easy');
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const acceptedEvents = await Event.find({
      acceptedVolunteers: userId,
    });
    res.json({
      user: user,
      acceptedEvents: acceptedEvents,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.firstName = req.query.data.firstName;
    user.lastName = req.query.data.lastName;
    user.contact = req.query.data.contact;
    user.link = req.query.data.link;
    user.skill = req.query.data.skill;
    user.location = req.query.data.location;
    user.image = req.file;
    user.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    await user.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUser,
  updateUser,
};
