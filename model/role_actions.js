'use strict';

const db = require('./db.js');

module.exports.getAllRoleActions = async() => {
    let result = await db.query("SELECT HEX(id) as id, name, description, display_order, HEX(role_id) as role_id FROM Users.Role_Actions;");
    return result[0];
};

module.exports.getRoleAction = async(action_id) => {
    let result = await db.query("SELECT HEX(id) as id, name, description, display_order, HEX(role_id) as role_id FROM Users.Role_Actions WHERE id = UNHEX(?)", [action_id]);
    return result[0];
};

module.exports.postRoleAction = async(input_params) => {
    let result = await db.query("INSERT INTO Users.Role_Actions (id, name, display_order, role_id) VALUES (Users.ordered_uuid(uuid()), ?, ?, UNHEX(?));", [input_params.name, input_params.display_order, input_params.role_id]);
    return result[0];
};

module.exports.patchRoleAction = async(action_id, input_params) => {
    let result = await db.query("UPDATE Users.Role_Actions SET ? WHERE id = UNHEX(?);", [input_params, action_id]);
    return result[0];
};

module.exports.deleteRoleAction = async(action_id) => {
    let result = await db.query("DELETE FROM Users.Role_Actions WHERE id = UNHEX(?);", action_id);
    return result[0];
};