const express = require('express');
const {
    httpSearchProperty,
} = require('./property.controller');

const propertyRouter = express.Router();

propertyRouter.post('/search', httpSearchProperty);


module.exports = propertyRouter;