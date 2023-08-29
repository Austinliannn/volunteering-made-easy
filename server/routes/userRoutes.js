const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/user', userController.getUser);
router.put('/updateUser', userController.updateUser);

module.exports = router;