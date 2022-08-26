const express = require('express');
const { verify } = require('../../middlewares/userVerify');

const {
    httpRemovePropertyAdmin,
    httpRemoveUser
} = require('./remove.controller');

const removeRouter = express.Router();

//remove user from seeComplaintUser and remove User
removeRouter.post('/admin/userremove/:id', httpRemoveUser);

//remove user from seeComplaintProperty and remove Property
removeRouter.post('/admin/propertyremove/:id', httpRemovePropertyAdmin);

module.exports = removeRouter;

