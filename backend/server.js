const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require("./config/database")


// Handling uncaught Execption
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message} `);
    console.log("Shuting down the server due to uncaught exception");
    process.exit(1);
})

// Config 
dotenv.config({path:"backend/config/config.env"});


// connecting to database 
connectDatabase()



const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// unhelded promise rejection 
process.on("unhandledRejection",err =>{
    console.log(`Error: ${err.message} `);
    console.log("Shuting down the server due to unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    })
})