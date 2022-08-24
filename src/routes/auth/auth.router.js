const express = require('express');
const { verify } = require('../../middlewares/userVerify');
const {
    httpLogIn,
    authenticateToken,
    httpGetNewAuthToken,
    httpLogOut,
} = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/login',httpLogIn);

// authRouter.get('/authenticate',authenticateToken,(req,res)=>{
//     res.status(200).json({
//         email:req.user.email,
//     })
// });

// authRouter.post('/token',httpGetNewAuthToken);

authRouter.get('/logout',verify,httpLogOut);

module.exports = authRouter;