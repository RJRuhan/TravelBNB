
const {
    addNewUser,
    GetUserById,
    existsUserWithId,
    GetUsers,
    existsUserWithEmail,
    addNewUserImage,
    existsUserPhoto,
} = require('../../models/users.model.js')

async function httpAddNewUser(req,res,next){
    const user = req.body;

    user.dob = new Date(user.dob);

    console.log(user);

    const result =  await addNewUser(user);
    
    if(!result.success)
        return res.render('signup.ejs',{
            message:"Email or Phone number already exists",
        })
    
    console.log(result.data);
    next();
}

async function httpGetUserById(req,res){
    const userId = Number(req.params.id);
    
    if( isNaN(userId) )
        return res.status(400).json({
            error:"Invalid user ID"
        });

    const result = await existsUserWithId(userId);

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    if(!result.found)
        return res.status(404).json({
            error: 'User not found',
        });

    return res.status(200).json(result.data.rows);
}

async function httpGetUserByEmail(req,res){

    const result = await existsUserWithEmail(req.params.email);

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    if(!result.found)
        return res.status(404).json({
            error: 'User not found',
        });

    return res.status(200).json(result.data.rows);
}

async function httpGetUsers(req,res){

    const result = await GetUsers();

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    return res.status(200).json(result.data.rows);
}


async function httpAddUserImage(req,res){
    console.log(req.file);

    if(!req.file)
       return res.redirect('/login');

    const email = req.body.email;
    let result = await existsUserWithEmail(email);

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    if(!result.found)
        return res.status(404).json({
            error: 'User not found',
        });

    // console.log(result.data.rows);

    result = await addNewUserImage(result.data.rows[0].USERID,'/images/usersProfilePic/' + req.file.filename);

    if(!result.success)
        return res.status(500).json({
            error:"Internal Server Error"
        });
    
    console.log(result.data);
    
    res.redirect('/login');
    
}

async function httpGetUserPhoto(req,res,next){

    req.query = await existsUserPhoto(req.user.USERID);
    next();
    
}


module.exports = {
    httpAddNewUser,
    httpGetUserById,
    httpGetUsers,
    httpAddUserImage,
    httpGetUserByEmail,
    httpGetUserPhoto
};