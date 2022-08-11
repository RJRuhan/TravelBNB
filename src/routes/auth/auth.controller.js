
const {
    logIn,
} = require('../../models/auth.model.js')

const jwt = require('jsonwebtoken');

let refreshTokens = [];

async function httpLogIn(req,res){

    const user = req.body;

    const result =  await logIn(user);
    
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
        userid: result.data.rows[0].USERID
    }

    const accessToken = jwt.sign(userObject,process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(userObject,process.env.REFRESH_TOKEN_SECRET);

    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }
    res.cookie('auth-token',accessToken,options);

    refreshTokens.push(refreshToken);

    res.redirect('/index');
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

    if( !refreshTokens.includes(refreshToken) )
        return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if( err ) return res.sendStatus(401);
        const accessToken = generateAccessToken({ email:user.email })
        res.json({accessToken:accessToken});
    });
}

async function httpLogOut(req,res){

    refreshTokens.filter(token=>token != req.body.token);
    res.sendStatus(204);
}

module.exports = {
    httpLogIn,
    authenticateToken,
    httpGetNewAuthToken,
    httpLogOut,
};