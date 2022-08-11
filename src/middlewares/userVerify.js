const jwt = require('jsonwebtoken');

const {
    findUserById,
} = require('../models/users.oracle.js');

async function verify(req,res,next){
    const cookie  = req.header('cookie');
    if(!cookie) return res.redirect('/login?status=Access Denied');
    const token = cookie.slice(11);
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

module.exports = {
    verify,
};