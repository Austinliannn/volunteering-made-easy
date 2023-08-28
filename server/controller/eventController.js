const Event = require("../models/eventModel");

async function getAllEvents(req, res) {
  try {
    const events = await Event.find()
      .populate('organizationId')
      .populate('applicants')
      .populate('acceptedVolunteers')
      .exec();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

module.exports = {
  getAllEvents,
};