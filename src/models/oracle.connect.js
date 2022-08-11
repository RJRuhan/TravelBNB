const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// creates connection pool for oracledb
async function startup() {
    console.log('starting up database.');
    await oracledb.createPool({
        user: 'hr',
        password: 'hr',
        connectionString: 'localhost/orcl',
        poolMin: 4,
        poolMax: 10,
        poolIncrement: 1
        //poolAlias: 'hrPool'
    });    
    console.log('pool created');
}

// closes connection pool for oracledb
async function shutdown() {
    console.log('shutting down database.');
    try {
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        await oracledb.getPool().close(10);
        console.log('Pool closed');
    } catch(err) {
        console.log("ERROR shutting down database: " + err.message);
    }
}


// async function connect(){
//     if( connection === undefined ){
//         console.log('Trying to Connect...');
//         try{
//             connection = await oracledb.getConnection({
//                 user:'hr',
//                 password:'hr',
//                 connectString:'localhost/orcl'
//             });
//             console.log('Connection successful...');
//         }
//         catch(err){
//             console.log('Connection failed...');
//             console.log(err);
//         }
//     }
    
// }

// code to execute sql
async function execute(query, params, options) {

    let connection, results;

    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        results = await connection.execute(query, params, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
        return {
            success: false,
            data: err,
        };
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    console.log('successful query...');
    return {
        success: true,
        data: results,
    };
}

async function executeMany(query, params, options) {
    let connection;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        results = await connection.executeMany(query, params, options);
        
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
        return {
            success: false,
            data: err,
        };
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return {
        success: true,
        data: results,
    };
}

async function executeWithoutClosingConnection(query, params, options) {

    let connection, results;

    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        results = await connection.execute(query, params, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
        return {
            success: false,
            data: err,
        };
    }

    return {
        success:true,
        data:results,
        conn: connection,
    };

}

async function numberOfRows(table_name){
    const params = [];
    const query = "SELECT num_rows FROM all_tables WHERE table_name = '" + table_name + "'";
    const options = {};
    return await execute(query,params,options);
}

async function newId(table_name,id){
    const params = [];
    const query = "SELECT MAX(" + id + ") AS id FROM " + table_name ;
    const options = {};
    const result = await execute(query,params,options);

    if( !result.success )
        return{
            success:false,
        };
    
    let ID;
    if( !result.data.rows[0] )
        ID = -1;
    else
        ID = result.data.rows[0]['ID'];

    return{
        success:true,
        newId:ID
    };
}

module.exports = {
    numberOfRows,
    execute,
    executeMany,
    executeWithoutClosingConnection,
    startup,
    shutdown,
    newId,
};