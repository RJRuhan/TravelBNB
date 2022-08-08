const express = require('express');
const {
    httpLogIn,
    authenticateToken,
    httpGetNewAuthToken,
    httpLogOut,
} = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/login',httpLogIn);

authRouter.get('/authenticate',authenticateToken,(req,res)=>{
    res.status(200).json({
        email:req.user.email,
    })
});

authRouter.post('/token',httpGetNewAuthToken);

authRouter.delete('/logout',httpLogOut);

module.exports = authRouter;