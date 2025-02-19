const express = require("express");
const { createOrder } = require("../controllers/orderController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const router = express.Router();
router.post("/", jwtMiddleware, createOrder);
module.exports = router;