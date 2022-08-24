const { 
    checkAdmin,
} = require('../../models/admin.oracle.js');


const jwt = require('jsonwebtoken');

let adminRefreshTokens = [];

async function httpAdminLogin(req,res){

    const user = req.body;

    const result =  await checkAdmin(user);

    if( result.success ){

        const user = result.data.rows;

        if( user.length === 0 ){
            result.found = false;
        }
        else
            result.found = true;
        
    }

    
    if(!result.success)
        return res.status(500).json({
            error:"Internal Server Error"
        });
    

    if(!result.found){
        const input = {
            email: req.body.email,
            password: req.body.password,
        }
        return res.render('login.ejs',{
            message: "Invalid email or password",
            user: input,
        });
    }
        
    console.log(result.data);

    const userObject = {
        userid: result.data.rows[0].ADMINID,
    }

    const accessToken = jwt.sign(userObject,process.env.ADMIN_ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(userObject,process.env.ADMIN_REFRESH_TOKEN_SECRET);

    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }
    res.cookie('auth-token',accessToken,options);

    // adminRefreshTokens.push(refreshToken);

    res.redirect('/admin/dummy');
}

async function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if( token === null)
        return res.status(401).json({
            error: "No token found",
        })

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if( err )
            return res.sendStatus(403);
        
        req.user = user;
        console.log(user);
        next();
    });
}


async function httpGetNewAuthToken(req,res){
    const refreshToken = req.body.token;

    if( refreshToken === null )
        return res.sendStatus(401);

    if( !adminRefreshTokens.includes(refreshToken) )
        return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if( err ) return res.sendStatus(401);
        const accessToken = generateAccessToken({ email:user.email })
        res.json({accessToken:accessToken});
    });
}

async function httpLogOut(req,res){

    // adminRefreshTokens.filter(token=>token != req.body.token);
    res.cookie('auth-token', '', { maxAge:1 });
    res.redirect('/admin/login');
}

module.exports = {
    httpAdminLogin,
    httpLogOut
};