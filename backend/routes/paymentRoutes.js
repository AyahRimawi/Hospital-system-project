const express = require("express");
const router = express.Router();
const PayPalController = require("../controller/paymentController");

router.post("/create-order", PayPalController.createOrder);
router.post("/capture-order", PayPalController.captureOrder);

module.exports = router;
