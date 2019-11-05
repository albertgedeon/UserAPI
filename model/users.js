'use strict';

const db = require('./db.js');

module.exports.getAllUsers = async() => {
    let result = await db.query("SELECT HEX(id) as id, first_name, last_name, department_id, HEX(role_id) as role_id, title, email FROM Users.Users;");
    return result[0];
};

module.exports.getUser = async(user_id) => {
    let result = await db.query("SELECT HEX(id) as id, first_name, last_name, department_id, HEX(role_id) as role_id, title, email FROM Users.Users WHERE id = UNHEX(?)", [user_id]);
    return result[0];
};

module.exports.getUserByEmail = async(email) => {
    let result = await db.query("SELECT HEX(id) as id, first_name, last_name, department_id, HEX(role_id) as role_id, title, email, password FROM Users.Users WHERE email = ?", [email]);
    return result[0];
};

module.exports.postUser = async(input_params) => {
    let result = await db.query("INSERT INTO Users.Users (id, first_name, last_name, email, password, role_id) VALUES (Users.ordered_uuid(uuid()), ?, ?, ?, ?, UNHEX(?));", [input_params.first_name, input_params.last_name, input_params.email, input_params.password, input_params.role_id]);
    console.log(result);
    return result[0];
};

module.exports.patchUser = async(user_id, input_params) => {
    let result = await db.query("UPDATE Users.Users SET ? WHERE id = UNHEX(?);", [input_params, user_id]);
    return result[0];
};

module.exports.deleteUser = async(user_id) => {
    let result = await db.query("DELETE FROM Users.Users WHERE id = UNHEX(?);", user_id);
    return result[0];
};