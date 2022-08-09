const express = require('express');
const {
    httpSearchProperty,
    renderSearchProperties,
} = require('./property.controller');

const propertyRouter = express.Router();

propertyRouter.post('/search', httpSearchProperty);

propertyRouter.get('/searchProperties',renderSearchProperties);

propertyRouter.post('/searchProperties',renderSearchProperties);



module.exports = propertyRouter;