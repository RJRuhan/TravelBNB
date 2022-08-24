
const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');

async function checkAdmin(user){
    console.log(user.email);
    console.log(user.password);
    const params = [user.email,user.password];
    const query = "SELECT * FROM admin WHERE email = :1 AND password = :2 ";
    const options = {};

    const result = await execute(query,params,options);

    return result;
}


async function findAdminByID(userId){

    const params = [userId];
    const query = "SELECT * FROM ADMIN WHERE adminid = :1";
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

module.exports = {
    checkAdmin,
    findAdminByID
}