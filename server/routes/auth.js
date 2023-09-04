const express = require('express');
const auth = require('../controller/auth');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('image'), auth.registerUser);
router.post('/login', auth.loginUser);

module.exports = router;