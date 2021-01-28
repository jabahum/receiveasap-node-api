//log the request url to the console
const logger =(req,res,next) =>{
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

//export method to be available globally
module.exports = logger;