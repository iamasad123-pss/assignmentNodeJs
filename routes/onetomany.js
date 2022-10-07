const express = require('express');
const router = express.Router();

const oneToManyController = require('../controllers/onetomanycontroller');

router.post('/onetomany', oneToManyController.oneToMany);

module.exports = router;
