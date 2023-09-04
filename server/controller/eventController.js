const Event = require("../models/eventModel");
const AcceptedEvent = require("../models/acceptedEventModel");

async function getAllEvents(req, res) {
  try {
    const events = await Event.find({
      applicants: { $nin: [req.body.userId] },
      acceptedVolunteers: { $nin: [req.body.userId] },
    })
      .populate("organizationId")
      .populate("applicants")
      .populate("acceptedVolunteers")
      .exec();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function getEvent(req, res) {
  try {
    const events = await Event.find({ organizationId: req.body.orgId })
      .populate("organizationId")
      .populate("applicants")
      .populate("acceptedVolunteers")
      .exec();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
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
      const newAcceptedEvent = new AcceptedEvent({
        user: req.body.data._id,
        event: req.body.eventId,
        totalHours: 0,
        checkInDateTime: "",
        checkOutDateTime: "",
      });

      await event.save();
      await newAcceptedEvent.save();
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
      eventName: req.query.data.eventName,
      cause: req.query.data.cause,
      shortDesc: req.query.data.shortDesc,
      description: req.query.data.description,
      startDate: req.query.data.startDate,
      endDate: req.query.data.endDate,
      inCharge: req.query.data.inCharge,
      contact: req.query.data.contact,
      skill: req.query.data.skill,
      location: req.query.data.location,
      completed: false,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      organizationId: req.query.orgData.user._id,
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
  console.log(req.query);
  console.log(req.file);

  try {
    const event = await Event.findById(req.query.eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    (event.eventName = req.query.data.eventName),
      (event.cause = req.query.data.cause),
      (event.shortDesc = req.query.data.shortDesc),
      (event.description = req.query.data.description),
      (event.startDate = req.query.data.startDate),
      (event.endDate = req.query.data.endDate),
      (event.inCharge = req.query.data.inCharge),
      (event.contact = req.query.data.contact),
      (event.skill = req.query.data.skill),
      (event.location = req.query.data.location),
      (event.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }),
      await event.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllEvents,
  getEvent,
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
