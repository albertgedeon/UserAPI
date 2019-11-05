'use strict';

const db = require('../model/users.js');

exports.postUser = async(req, res) => {
    try {
        let result = await db.postUser(req.body);
        if (result.affectedRows == 1) {
            console.log(result);
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
