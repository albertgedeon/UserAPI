'use strict';

const express = require('express');
var path = require('path');
var helmet = require('helmet');
const passport = require('passport');
require('console-stamp')(console, '[dd/mm/yyyy HH:MM:ss.l]');

const registration = require('./routes/register.js');
const users = require('./routes/users.js');
const departments = require('./routes/departments.js');
const roles = require('./routes/roles.js');
const role_actions = require('./routes/role_actions.js');

const auth = require('./routes/auth');

const app = express();
const port = 80;

app.use(helmet());
app.use(express.json());

app.get('/usershealth', async(req, res) => {
    return res.json({ status: 'up' , api : 'users'});
});

app.use('/auth', auth);
app.use('/register/user', registration);
app.use('/users', users);
app.use('/departments', departments);
app.use('/roles', roles);
app.use('/roleactions', role_actions);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));