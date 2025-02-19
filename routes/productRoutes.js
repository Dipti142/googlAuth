const express = require("express");
const { createProduct } = require("../controllers/productController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const router = express.Router();
router.post("/", jwtMiddleware, createProduct);
module.exports = router;