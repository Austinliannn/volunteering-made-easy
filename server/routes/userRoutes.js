const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/getUser', userController.getUser);
router.put('/updateUser', userController.updateUser);

module.exports = router;