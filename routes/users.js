'use strict';

var express = require('express');
var router = express.Router();
const controller = require('../controllers/users.js');
const tokenHandler = require('../controllers/token_handler.js');

router.get('/', tokenHandler.verifyToken, controller.getAllUsers);

router.get('/:user_id', tokenHandler.verifyToken, controller.getUsers);

router.post('/', tokenHandler.verifyToken, controller.postUsers);

router.patch('/:user_id', tokenHandler.verifyToken, controller.patchUsers);

router.delete('/:user_id', tokenHandler.verifyToken, controller.deleteUsers);

module.exports = router;