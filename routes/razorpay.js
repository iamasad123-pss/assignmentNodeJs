const express = require('express');
const router = express.Router();

const razorPayController = require('../controllers/razorpaycontroller');

router.post('/createorder', razorPayController.razorpayOrder);

module.exports = router;
