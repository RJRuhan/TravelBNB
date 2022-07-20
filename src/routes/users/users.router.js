const express = require('express');

const {
    httpAddNewUser,
    httpGetUserById,
    httpGetUsers,
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/',httpAddNewUser);

usersRouter.get('/:id',httpGetUserById);
usersRouter.get('/',httpGetUsers);




module.exports = usersRouter;