const { application, Router } = require('express');
const express = require('express');
const { verify } = require('../../middlewares/userVerify');

const {
    renderDashboard
}=require('./dashboard.controller');

const dashRouter=express.Router();

dashRouter.get('/dashboard',verify, renderDashboard);

module.exports=dashRouter;

