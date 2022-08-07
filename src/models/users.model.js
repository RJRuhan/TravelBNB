const {
    insertUser,
    findUserById,
    findUsers,
    checkUser,
    findUserByEmail,
    insertUserImage,
} = require('./users.oracle');

async function addNewUser(user){
    return await insertUser(user);

}

async function logIn(user){
    const result = await checkUser(user);

    if( result.success ){

        const user = result.data.rows;

        if( user.length === 0 )
            return {
                success:true,
                found:false,
            };

        return {
            success:true,
            found:true,
            data:result.data,
        };
    }

    return{
        success:false,
    };
}

async function GetUserById(userId){
    return await findUserById(userId);
}

async function existsUserWithId(userId){

    const result = await findUserById(userId);

    if( result.success ){

        const user = result.data.rows;

        if( user.length === 0 )
            return {
                success:true,
                found:false,
            };

        return {
            success:true,
            found:true,
            data:result.data,
        };
    }

    return{
        success:false,
    };
}

async function existsUserWithEmail(email){

    const result = await findUserByEmail(email);

    if( result.success ){

        const user = result.data.rows;

        if( user.length === 0 )
            return {
                success:true,
                found:false,
            };

        return {
            success:true,
            found:true,
            data:result.data,
        };
    }

    return{
        success:false,
    };
}

async function GetUsers(){
    return await findUsers();
}

async function addNewUserImage(userid,filepath){
    return await insertUserImage(userid,filepath);

}


module.exports = {
    addNewUser,
    GetUserById,
    existsUserWithId,
    GetUsers,
    logIn,
    existsUserWithEmail,
    addNewUserImage,
}