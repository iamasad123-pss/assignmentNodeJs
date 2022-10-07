const express = require('express');
const router = express.Router();

const manyToManyController = require('../controllers/manytomanycontroller');

router.post('/manytomany', manyToManyController.manyToMany);

module.exports = router;
