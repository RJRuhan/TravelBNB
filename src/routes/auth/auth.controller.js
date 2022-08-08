
const {
    logIn,
} = require('../../models/auth.model.js')

const jwt = require('jsonwebtoken');

let refreshTokens = [];

async function httpLogIn(req,res){

    const user = req.body;
    if( !user.email || !user.password ){
            return res.status(400).json({
                error:"Missing required user property"
            });
        }


    const result =  await logIn(user);
    
    if(!result.success)
        return res.status(500).json({
            error:"Internal Server Error"
        });
    

    if(!result.found)
        return res.status(401).json({
            error: 'Invalid email or Password',
        });

    console.log(result.data);

    const userObject = {
        email: req.body.email
    }

    const accessToken = generateAccessToken(userObject);
    const refreshToken = jwt.sign(userObject,process.env.REFRESH_TOKEN_SECRET);

    console.log({accessToken:accessToken});

    refreshTokens.push(refreshToken);

    return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
}

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30m'
    });
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