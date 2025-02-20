const express = require('express');
const { googleAuth, sendOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/google', googleAuth);
router.post('/otp', sendOtp);

module.exports = router;




