// const http = require('http');
// const portfinder = require('portfinder');
// const app = require('./app');

const { startup,shutdown,execute } = require("./models/oracle.connect");

// const { shutdown, startup } = require('./models/oracle.connect');

// process.env.UV_THREADPOOL_SIZE = 10;

// portfinder.basePort = 8000;
// portfinder.highestPort = 9000;

// const server = http.createServer(app);

// let port;

// portfinder.getPort((err,PORT)=>{
//     try{
//         if(err) 
//             throw err;

//         server.listen(PORT,async()=>{
//             try{
//                 // create database connection pool, log startup message
//                 await startup();
//                 console.log(`listening on ${PORT}...`);
//                 port = PORT;
//             } catch(err) {
//                 console.log("Error starting up database: " + err);
//                 process.exit(1);
//             }
//         });
    
//     }catch(err){
//         console.log(err);
//     }
// });

// process.once('SIGTERM',shutdown)
// .once('SIGINT',  shutdown);

// // process.on('uncaughtException',async()=>await server.close());

async function execute2(query, params, options){
    // preparedStatement stmt = conn.prepareStatement("INSERT INTO student VALUES(?)");
    stmt.setString(1, user);
    stmt.execute();
}

async function todo(){
    await startup();


    const params = [222];
    const query = `DECLARE
    MSG VARCHAR2(2000);
   BEGIN
       testProc1(:1,MSG);
       DBMS_OUTPUT.PUT_LINE(MSG);
   
   END;`;

    const options = {
    };

    const result = await execute(query,params,options);

    console.log(result);

    return result;


}

function toot(){
    todo();

}


toot();


process.once('SIGTERM',shutdown)
.once('SIGINT',  shutdown);