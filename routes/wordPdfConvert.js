const express = require('express');
const router = express.Router();

const WordToPdfController = require('../controllers/wordtopdfcontroller');

router.post('/wordtopdf', WordToPdfController.wordPdfConvert);

module.exports = router;
