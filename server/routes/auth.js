const express = require('express');
const auth = require('../controller/auth');

const router = express.Router();

router.post('/register', auth.registerUser);

module.exports = router;