const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
//HandlinguncaughtProcess
process.on("uncaughtException",(err)=>{
    console.error(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`)
    process.exit(1);
})


dotenv.config({path:"./config/config.env"});

connectDatabase()
cloudinary.config({
    cloud_name : process.env.CLOUNDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});


//unhandleded Promise rejection
process.on("unhandledRejection",(err)=>{
    console.error(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`)
    server.close(()=>{
        process.exit(1);
        
    });
})