const express = require('express');
const userController = require('../controller/userController');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getUser', userController.getUser);
router.put('/updateUser', upload.single('image'), userController.updateUser);

module.exports = router;