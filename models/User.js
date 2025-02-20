const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    password: String,
    otp: String,
    otpExpires: Date
});

module.exports = mongoose.model('User', UserSchema);

