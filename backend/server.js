const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
//HandlinguncaughtProcess
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`)
    process.exit(1);
})


dotenv.config({path:"./config/config.env"});

connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`);
});


//unhandleded Promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1);
        
    });
})