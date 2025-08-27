const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log(`mongodb connected with server: ${mongoose.connection.host}`);
    })
    // .catch((err)=>{
    //     console.log(err)

    // })

}
module.exports = connectDatabase;
