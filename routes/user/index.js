require("dotenv").config();
const express = require('express');
const user = express.Router();
const {login, register, loginRequired} = require('../../controllers/userController')

// User registration
// user.post('/website/auth/register',loginRequired,register);
// user.post('/website/login',register);

module.exports = user
