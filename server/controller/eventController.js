const Event = require("../models/eventModel");
const AcceptedEvent = require("../models/acceptedEventModel");

async function getAllEvents(req, res) {
  try {
    const events = await Event.find()
      .populate("organizationId")
      .populate("applicants")
      .populate("acceptedVolunteers")
      .exec();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function applyEvent(req, res) {
  try {
    const event = await Event.findById(req.body.data._id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.applicants.includes(req.body.userId)) {
      return res
        .status(400)
        .json({ error: "User is already an applicant for this event" });
    }

    event.applicants.push(req.body.userId);
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function getAcceptedEvents(req, res) {
  try {
    const events = await AcceptedEvent.find({ user: req.body.userId })
      .populate("user")
      .populate("event")
      .exec();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function checkIn(req, res) {
  try {
    const event = await AcceptedEvent.findById(req.body.data._id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.checkInDateTime = req.body.data.checkInDateTime;
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function checkOut(req, res) {
  try {
    const event = await AcceptedEvent.findById(req.body.data._id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.totalHours = req.body.data.totalHours;
    event.checkOutDateTime = req.body.data.checkOutDateTime;
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function deleteVolunteer(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.acceptedVolunteers = event.acceptedVolunteers.filter(
      (volunteer) => volunteer.toString() !== req.body.data._id
    );
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteApplicant(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.applicants = event.applicants.filter(
      (applicant) => applicant.toString() !== req.body.data._id
    );
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addApplicant(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (!event.acceptedVolunteers.includes(req.body.data._id)) {
      event.applicants = event.applicants.filter(
        (applicant) => applicant.toString() !== req.body.data._id
      );
      event.acceptedVolunteers.push(req.body.data._id);
      await event.save();
      res.json({ message: "Successful" });
    } else {
      res.json({ message: "Volunteer already exists" });
    }
  } catch (error) {
    console.error("Error adding applicant to event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function completeEvent(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.completed = true;
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error adding applicant to event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function postEvent(req, res) {
try {
  const newEvent = new Event({
    eventName: req.body.data.eventName,
    cause: req.body.data.cause,
    shortDesc: req.body.data.shortDesc,
    description: req.body.data.description,
    startDate: req.body.data.startDate,
    endDate: req.body.data.endDate,
    inCharge: req.body.data.inCharge,
    contact: req.body.data.contact,
    skill: req.body.data.skill,
    location: req.body.data.location,
    completed: false,
    image: req.body.data.image,
    organizationId: req.body.orgData.user._id,
    applicants: [],
    acceptedVolunteers: [],
  });
  await newEvent.save();
  res.status(201).json({ message: "Successful" });
} catch (error) {
  console.error("Post Event error:", error);
  res.status(500).json({ message: "Internal server error" });
}
}

async function updateEvent(req, res) {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.eventName = req.body.data.eventName,
    event.cause = req.body.data.cause,
    event.shortDesc = req.body.data.shortDesc,
    event.description = req.body.data.description,
    event.startDate = req.body.data.startDate,
    event.endDate = req.body.data.endDate,
    event.inCharge = req.body.data.inCharge,
    event.contact = req.body.data.contact,
    event.skill = req.body.data.skill,
    event.location = req.body.data.location,
    event.image = req.body.data.image,
    await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllEvents,
  applyEvent,
  getAcceptedEvents,
  checkIn,
  checkOut,
  deleteVolunteer,
  deleteApplicant,
  addApplicant,
  completeEvent,
  postEvent,
  updateEvent,
};
