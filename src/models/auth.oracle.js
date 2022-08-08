const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function checkUser(user){
    const params = [user.email,user.password];
    const query = "SELECT * FROM airbnbuser WHERE email = :1 AND password = :2";
    const options = {};

    const result = await execute(query,params,options);

    return result;
}

module.exports = {
    checkUser,
}