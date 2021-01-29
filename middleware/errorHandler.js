 const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next) =>{
    let error = { ...err};

    error.message = err.message;

    console.log(`❌ ${err}`);

    //Mongoose bad ObjectId Handler
    if(err.name === "CastError"){
        const message = `Product with ID ${err.value} not found!`;
        error = new ErrorResponse(message,404); 
    };

    //Mangoose duplicate Error
    if(err.code === 11000){
        const message = `Duplication product`;
        error = new ErrorResponse(message,400); 
    };

    //Mongoose validation Error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400); 
    };


    res.status(error.statusCode || 400).json({
        success : false,
        msg : error.message || "Bad Request"
    });
};

module.exports = errorHandler;