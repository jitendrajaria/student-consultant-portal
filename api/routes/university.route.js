const express = require('express');
const queryHandler = require('../controllers/query.controller');
const { inputQueryValidate } = require('./university.input.schema');

const router = express.Router();
router.get('/university', inputQueryValidate, queryHandler);

module.exports = router;
