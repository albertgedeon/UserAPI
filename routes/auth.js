'use strict';

const express = require('express');
var router = express.Router();
const controller = require('../controllers/users.js');

router.post('/', controller.loginUser);

module.exports = router;