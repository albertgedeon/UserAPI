'use strict';

var express = require('express');
var router = express.Router();
const controller = require('../controllers/register.js');

router.post('/', controller.postUser);

module.exports = router;