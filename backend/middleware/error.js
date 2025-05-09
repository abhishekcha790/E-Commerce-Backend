const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const ErrorHandler = require("../util/errorhander");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internel Server Error";

    // Cast error
if(err.name==="CastError"){
    const message = `Resource not found. invalid: ${err.path}`;
    err = new ErrorHandler(message,400);
}


//  Mongoose duplicate key error
if(err.code === 11000){
   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400); 
}
//  Wrong JWT token
if(err.name === JsonWebTokenError){
   const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message,400); 
}

//  JWT Expire error
if(err.name === TokenExpiredError){
   const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message,400); 
}

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
}  