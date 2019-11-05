'use strict';

var express = require('express');
var router = express.Router();
const controller = require('../controllers/departments.js');
const tokenHandler = require('../controllers/token_handler.js');

router.get('/', tokenHandler.verifyToken, controller.getAllDepartments);

router.get('/:department_id', tokenHandler.verifyToken, controller.getDepartments);

router.post('/', tokenHandler.verifyToken, controller.postDepartments);

router.patch('/:department_id', tokenHandler.verifyToken, controller.patchDepartments);

router.delete('/:department_id', tokenHandler.verifyToken, controller.deleteDepartments);

module.exports = router;