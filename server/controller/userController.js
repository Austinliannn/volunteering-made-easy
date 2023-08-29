const User = require("../models/userModel");
const Event = require("../models/eventModel");

async function getUser(req, res) {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const acceptedEvents = await Event.find({ acceptedVolunteers: userId });
    res.json({
      user: user,
      acceptedEvents: acceptedEvents,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function updateUser(req, res) {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.firstName = req.body.data.firstName;
    user.lastName = req.body.data.lastName;
    user.contact = req.body.data.contact;
    user.link = req.body.data.link;
    user.skill = req.body.data.skill;
    user.location = req.body.data.location;
    user.image = req.body.data.image;
    await user.save();
    res.json({ message: 'Successful' });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getUser,
  updateUser,
};
