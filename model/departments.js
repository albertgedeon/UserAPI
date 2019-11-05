'use strict';

const db = require('./db.js');

module.exports.getAllDepartments = async() => {
    let result = await db.query("SELECT HEX(id) as id, name, description, general_ledger_number, cost_center, display_order, HEX(leader_id) as leader_id FROM Users.Departments;");
    return result[0];
};

module.exports.getDepartment = async(department_id) => {
    let result = await db.query("SELECT HEX(id) as id, name, description, general_ledger_number, cost_center, display_order, HEX(leader_id) as leader_id FROM Users.Departments WHERE id = UNHEX(?)", [department_id]);
    return result[0];
};

module.exports.postDepartment = async(input_params) => {
    let result = await db.query("INSERT INTO Users.Departments (id, name, display_order) VALUES (Users.ordered_uuid(uuid()), ?, ?);", [input_params.name, input_params.display_order]);
    return result[0];
};

module.exports.patchDepartment = async(department_id, input_params) => {
    let result = await db.query("UPDATE Users.Departments SET ? WHERE id = UNHEX(?);", [input_params, department_id]);
    return result[0];
};

module.exports.deleteDepartment = async(department_id) => {
    let result = await db.query("DELETE FROM Users.Departments WHERE id = UNHEX(?);", department_id);
    return result[0];
};