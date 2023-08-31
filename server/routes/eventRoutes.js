const express = require('express');
const eventController = require('../controller/eventController');

const router = express.Router();

router.get('/events', eventController.getAllEvents);
router.post('/getEvent', eventController.getEvent);
router.post('/applyEvent', eventController.applyEvent);
router.post('/getAcceptedEvents', eventController.getAcceptedEvents);
router.put('/checkIn', eventController.checkIn);
router.put('/checkOut', eventController.checkOut);
router.delete('/deleteVolunteer', eventController.deleteVolunteer);
router.delete('/deleteApplicant', eventController.deleteApplicant);
router.post('/addApplicant', eventController.addApplicant);
router.put('/completeEvent', eventController.completeEvent);
router.post('/postEvent', eventController.postEvent);
router.put('/updateEvent', eventController.updateEvent);

module.exports = router;