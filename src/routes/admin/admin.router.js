const express = require('express');
const { adminVerify } = require('../../middlewares/userVerify');

const {
    httpAdminLogin, httpLogOut,
} = require('./admin.controller');


const adminRouter = express.Router();

adminRouter.get('/login',(req,res)=>{
    // console.log('here');
    res.render('adminLogin.ejs',{
        message:'',
        user:{
            email:null,
            password:null,
        },
    });
});

adminRouter.post('/login',httpAdminLogin);

adminRouter.get('/dummy',adminVerify,(req,res)=>{
    res.render('adminLogin.ejs',{
        message:'',
        user:{
            email:null,
            password:null,
        },
    });
})

adminRouter.get('/logout',httpLogOut);

module.exports = adminRouter;