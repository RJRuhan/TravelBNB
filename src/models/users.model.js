const {
    insertUser,
    findUserById,
    findUsers,
} = require('./users.oracle');

async function addNewUser(user){
    return await insertUser(user);
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

async function GetUsers(){
    return await findUsers();
}

module.exports = {
    addNewUser,
    GetUserById,
    existsUserWithId,
    GetUsers,
}