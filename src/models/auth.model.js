
const {
    checkUser,
} = require('./auth.oracle');

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


module.exports = {
    logIn,
};