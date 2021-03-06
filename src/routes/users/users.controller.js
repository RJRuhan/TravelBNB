const {
    addNewUser,
    GetUserById,
    existsUserWithId,
    GetUsers,
} = require('../../models/users.model.js')


async function httpAddNewUser(req,res){
    const user = req.body;
    if( !user.firstName || !user.lastName || !user.email || !user.password ||
        !user.phoneNo ){
            return res.status(400).json({
                error:"Missing required user property"
            });
        }

    user.dob = new Date(user.dob);

    if(isNaN(user.dob)){
        return res.status(400).json({
            error:"Invalid user dob"
        });
    }

    const result =  await addNewUser(user);
    
    if(!result.success)
        return res.status(500).json({
            error:"Internal Server Error"
        });
    
    console.log(result.data);
    return res.status(201).json(user);
    
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


async function httpGetUsers(req,res){

    const result = await GetUsers();

    if(!result.success){
        return res.status(500).json({
            error:"Internal Server Error"
        });
    }

    return res.status(200).json(result.data.rows);
}



module.exports = {
    httpAddNewUser,
    httpGetUserById,
    httpGetUsers,
};