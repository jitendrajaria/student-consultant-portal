const express = require('express');
const queryHandler = require('../controllers/query.controller');

const router = express.Router();
router.get('/university', queryHandler);

module.exports = router;
