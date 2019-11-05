'use strict';

const db = require('../model/users.js');
const tokenHandler = require('./token_handler.js');

exports.getAllUsers = async(req, res) => {
    try {
        let result = await db.getAllUsers();
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.getUsers = async(req, res) => {
    try {
        let result = await db.getUser(req.params.user_id);
        return res.status(200).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.postUsers = async(req, res) => {
    try {
        let result = await db.postUser(req.body);
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

exports.patchUsers = async(req, res) => {
    try {
        let result = await db.patchUser(req.params.user_id, req.body);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.deleteUsers = async(req, res) => {
    try {
        let result = await db.deleteUser(req.params.user_id);
        return res.status(204).send(JSON.stringify(result));
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
};

exports.loginUser = async(req, res) => {
    try {
        let result = await db.getUserByEmail(req.body.email);

        if (result[0].password == req.body.password) {
            delete result[0].password;
            result[0].token = await tokenHandler.generateToken(req.body.email, result[0]);
            return res.status(200).send(JSON.stringify(result));
        } else {
            return res.status(401).send();
        }
    } catch (exception) {
        return res.status(500).send(JSON.stringify(exception));
    }
    return res.status(200).send(JSON.stringify("LoggedIn"));
};