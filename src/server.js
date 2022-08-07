const http = require('http');
const { app } = require('./app');

const { shutdown, startup } = require('./models/oracle.connect');

process.env.UV_THREADPOOL_SIZE = 10;

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

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
    

process.once('SIGTERM',shutdown)
.once('SIGINT',  shutdown);

// process.on('uncaughtException',async()=>await server.close());

module.exports = {
    PORT,
};