'use strict';

const db = require('./db.js');

module.exports.getAllRoles = async() => {
    let result = await db.query("SELECT HEX(id) as id, name, description, display_order FROM Users.Roles;");
    return result[0];
};

module.exports.getRole = async(role_id) => {
    let result = await db.query("SELECT HEX(id) as id, name, description, display_order FROM Users.Roles WHERE id = UNHEX(?)", role_id);
    return result[0];
};

module.exports.postRole = async(input_params) => {
    let result = await db.query("INSERT INTO Users.Roles (id, name, display_order, description) VALUES (Users.ordered_uuid(uuid()), ?, ?, ?);", [input_params.name, input_params.display_order, input_params.description]);
    return result[0];
};

module.exports.patchRole = async(role_id, input_params) => {
    let result = await db.query("UPDATE Users.Roles SET ? WHERE id = UNHEX(?);", [input_params, role_id]);
    return result[0];
};

module.exports.deleteRole = async(role_id) => {
    let result = await db.query("DELETE FROM Users.Roles WHERE id = UNHEX(?);", role_id);
    return result[0];
};