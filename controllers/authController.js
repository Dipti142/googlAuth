const passport = require("passport");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
exports.googleCallback = async (req, res) => {
  const token = generateToken(req.user);
  res.json({ user: req.user, token });
};

