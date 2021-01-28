//express file
const express = require('express');

//.env file
const dotenv = require('dotenv');

//logger file
const logger = require('./middleware/logger');

//databse connection file 
const connectDB = require('./config/db');

const cookieParser = require('cookie-parser');

//route files
//const alerts = require('./routes/alerts');
const auth = require('./routes/auth.routes');
const products = require('./routes/products.routes');

//const { populate } = require('./models/Alert');

//load env varriables
dotenv.config({path:'./config/config.env'});

//load error handler
const errorHandler = require('./middleware/errorHandler');

//use express to extract requests and responses
const app = express();

//body parser
app.use(express.json());
app.use(cookieParser());

//connect to database
connectDB();

//log url requests
app.use(logger);

//route to routes
//app.use('/api/v1/alerts', alerts);
app.use('/api/v1/auth', auth);
app.use('/api/v1/products',products);

//initiate error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5080;

const server = app.listen(
    PORT, console.log(`🚀Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
    );

//handle unhandled rejections and stop the server instead of crashing the application
process.on('unhandledRejection', (err,promise) => {
    console.log(`❌ Error: ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
});