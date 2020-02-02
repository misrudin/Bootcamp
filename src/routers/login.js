const express = require('express');
const auth = require('../helpers/auth');

const router = express.Router();
const controlerLogin = require('../controllers/login')

router
    .post('/login', controlerLogin.loginUser)// router user
    .post('/logout', controlerLogin.logout)

module.exports = router;