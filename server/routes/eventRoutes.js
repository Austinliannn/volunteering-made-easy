const express = require('express');
const eventController = require('../controller/eventController');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/events', eventController.getAllEvents);
router.post('/getEvent', eventController.getEvent);
router.post('/applyEvent', eventController.applyEvent);
router.post('/getAcceptedEvents', eventController.getAcceptedEvents);
router.put('/checkIn', eventController.checkIn);
router.put('/checkOut', eventController.checkOut);
router.delete('/deleteVolunteer', eventController.deleteVolunteer);
router.delete('/deleteApplicant', eventController.deleteApplicant);
router.post('/addApplicant', eventController.addApplicant);
router.put('/completeEvent', eventController.completeEvent);
router.post('/postEvent', upload.single('image'), eventController.postEvent);
router.put('/updateEvent', upload.single('image'), eventController.updateEvent);

module.exports = router;