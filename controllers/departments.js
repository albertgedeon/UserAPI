'use strict';

const db = require('../model/departments.js');

exports.getAllDepartments = async(req, res) => {
    try {
        let result = await db.getAllDepartments();
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};
exports.getDepartments = async(req, res) => {
    try {
        let result = await db.getDepartment(req.params.department_id);
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};
exports.postDepartments = async(req, res) => {
    try {
        let result = await db.postDepartment(req.body);
        if (result.affectedRows == 1) {
            return res.status(201).send();
        }
        return res.status(201).send(JSON.stringify(result));
    } catch (exception) {
        if (exception.code == "ER_DUP_ENTRY") {
            return res.status(500).send("{\"error_message\":\"Entry Already Exists\",\"error_code\":\"ER_DUP_ENTRY\"}");
        }
        return res.status(500).send(JSON.stringify(exception));
    }
};
exports.patchDepartments = async(req, res) => {
    try {
        let result = await db.patchDepartment(req.params.department_id, req.body);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};
exports.deleteDepartments = async(req, res) => {
    try {
        let result = await db.deleteDepartment(req.params.department_id);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};