const {
    execute,
    executeMany,
    executeWithoutClosingConnection,
    newId,
} = require('./oracle.connect');


async function insertUser(user){

    const params = [ user.firstName,user.lastName,user.email,user.password,user.phoneNo,user.dob];
    const query = "INSERT INTO airbnbuser(firstname,lastname,email,password,phoneno,dob) VALUES(:1,:2,:3,:4,:5,:6)";
    const options = {
        autoCommit: true,
    };

    const result = await execute(query,params,options);

    // console.log(result);

    return result;

}

async function findUserById(userId){

    const params = [userId];
    const query = "SELECT * FROM airbnbuser WHERE userid = :1";
    const options = {};

    const result = await execute(query,params,options);

    // console.log(result.rows);

    return result;
}

async function findUsers(){

    const params = [];
    const query = "SELECT * FROM airbnbuser";
    const options = {};

    const result = await execute(query,params,options);

    return result;
}



// async function findUsers2(){

//     const params = [];
//     const query = "SELECT * FROM airbnbuser";
//     const options = {resultSet:true,};

//     const res = await executeWithoutClosingConnection(query,params,options);
//     const result = res[0];
//     const connection = res[1];

//     if( result === undefined )
//         return result;

//     let users = [];
//     const numRows = 10;

//     const rs = result.resultSet;
//     let rows;

//     do {
//         rows = await rs.getRows(numRows); // get numRows rows at a time
//         if (rows.length > 0) {
//             console.log("getRows(): Got " + rows.length + " rows");
//             console.log(rows);
//             rows.forEach((val)=>{
//                 users.push(val);
//             })
//         }
//     }while(rows.length === numRows);

//     // always close the ResultSet
//     await rs.close();

//     if (connection) {
//         try {
//             // Put the connection back in the pool
//             await connection.close();
//         } catch (err) {
//             console.log("ERROR closing connection: " + err);
//         }
//     }

//     console.log(users.length);
//     return users;

// }


module.exports = {
    insertUser,
    findUserById,
    findUsers,
}


// async function toot(){
//     const res = await insertUser(
//         {
//             firstName: "Marie",
//             lastName: "Curie",
//             email: "marie@gmail.com",
//             password: "1234",
//             phoneNo: "0124421",
//             dob: new Date("January 21,1980")
//         }
//     );
        
//     console.log(res);


// }

// async function toot2(){
    
//     try{
//         // create database connection pool, log startup message
//         await startup();
//         console.log(`listening on http://localhost`);
//         const res = await findUserById(2);
//         console.log(res);
//         // await shutdown();
//     } catch(err) {
//         console.log("Error starting up database: " + err);
//         process.exit(1);
//     }

    
// }
    



