const jwt = require('jsonwebtoken');

const {
    findUserById,
} = require('../models/users.oracle.js');

const { 
    findAdminByID,
} = require('../models/admin.oracle.js');

async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/login?status=Access Denied');
    // console.log(cookie);
    const token = cookie.slice(11);
    // console.log(token);
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const result = await findUserById(verified.userid);
        req.user = result.data.rows[0];
        console.log(req.user);
        next();

    }catch(err){
        return res.redirect('/login?status=Access Denied');
    }
}


async function adminVerify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/admin/login?status=Access Denied');
    const token = cookie.slice(11);
    try{
        const verified = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
        const result = await findAdminByID(verified.userid);
        req.admin = result.data.rows[0];
        console.log(req.admin);
        next();

    }catch(err){
        console.log('Access denied');
        return res.redirect('/admin/login?status=Access Denied');
    }
}

module.exports = {
    verify,
    adminVerify,
};