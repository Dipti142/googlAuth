const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP } = require('../utils/auth');
const { sendOTP } = require('../utils/emailService');

exports.googleAuth = async (req, res) => {
    try {
        const { googleId, name, email, avatar } = req.body;
        let user = await User.findOne({ googleId });

        if (!user) {
            user = new User({ googleId, name, email, avatar });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTP();
        const user = await User.findOneAndUpdate({ email }, { otp, otpExpires: Date.now() + 10 * 60 * 1000 });

        if (!user) return res.status(404).json({ message: 'User not found' });

        await sendOTP(email, otp);
        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP' });
    }
};


