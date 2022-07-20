const http = require('http');
const portfinder = require('portfinder');
const app = require('./app');

const { shutdown, startup } = require('./models/oracle.connect');

process.env.UV_THREADPOOL_SIZE = 10;

portfinder.basePort = 8000;
portfinder.highestPort = 9000;

const server = http.createServer(app);

let port;

portfinder.getPort((err,PORT)=>{
    try{
        if(err) 
            throw err;

        server.listen(PORT,async()=>{
            try{
                // create database connection pool, log startup message
                await startup();
                console.log(`listening on ${PORT}...`);
                port = PORT;
            } catch(err) {
                console.log("Error starting up database: " + err);
                process.exit(1);
            }
        });
    
    }catch(err){
        console.log(err);
    }
});

process.once('SIGTERM',shutdown)
.once('SIGINT',  shutdown);

// process.on('uncaughtException',async()=>await server.close());

