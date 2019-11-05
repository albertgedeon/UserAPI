'use strict';

const db = require('../model/role_actions.js');

exports.getAllRoleActions = async(req, res) => {
    try {
        let result = await db.getAllRoleActions();
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.getRoleActions = async(req, res) => {
    try {
        let result = await db.getRoleAction(req.params.action_id);
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.postRoleActions = async(req, res) => {
    try {
        let result = await db.postRoleAction(req.body);
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

exports.patchRoleActions = async(req, res) => {
    try {
        let result = await db.patchRoleAction(req.params.action_id, req.body);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.deleteRoleActions = async(req, res) => {
    try {
        let result = await db.deleteRoleAction(req.params.action_id);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};