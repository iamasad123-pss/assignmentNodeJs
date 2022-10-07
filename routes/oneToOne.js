const express = require('express');
const router = express.Router();

const oneToOneController = require('../controllers/onetoonecontroller');

router.post('/onetoone', oneToOneController.oneToOne);

module.exports = router;
