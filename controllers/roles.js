'use strict';

const db = require('../model/roles.js');

exports.getAllRoles = async(req, res) => {
    try {
        let result = await db.getAllRoles();
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.getRoles = async(req, res) => {
    try {
        let result = await db.getRole(req.params.role_id);
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.postRoles = async(req, res) => {
    try {
        let result = await db.postRole(req.body);
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

exports.patchRoles = async(req, res) => {
    try {
        let result = await db.patchRole(req.params.role_id, req.body);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.deleteRoles = async(req, res, next) => {
    try {
        let result = await db.deleteRole(req.params.role_id);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};