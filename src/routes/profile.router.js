const express = require('express');
const { verify } = require('../../middlewares/userVerify');

const {
    renderProfilePage
} = require('./profile.controller');

const profileRouter = express.Router();

profileRouter.get('/profile/:id', renderProfilePage);

module.exports = {profileRouter};