'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/role_actions.js');
const tokenHandler = require('../controllers/token_handler.js');

router.get('/', tokenHandler.verifyToken, controller.getAllRoleActions);

router.get('/:action_id', tokenHandler.verifyToken, controller.getRoleActions);

router.post('/', tokenHandler.verifyToken, controller.postRoleActions);

router.patch('/:action_id', tokenHandler.verifyToken, controller.patchRoleActions);

router.delete('/:action_id', tokenHandler.verifyToken, controller.deleteRoleActions);

module.exports = router;