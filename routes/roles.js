'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/roles.js');
const tokenHandler = require('../controllers/token_handler.js');

router.get('/', tokenHandler.verifyToken, controller.getAllRoles);

router.get('/:role_id', tokenHandler.verifyToken, controller.getRoles);

router.post('/', tokenHandler.verifyToken, controller.postRoles);

router.patch('/:role_id', tokenHandler.verifyToken, controller.patchRoles);

router.delete('/:role_id', tokenHandler.verifyToken, controller.deleteRoles);

module.exports = router;