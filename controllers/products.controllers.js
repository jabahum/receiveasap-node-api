const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Alert = require('../models/Alert');
const Product = require('../models/products.models')
const { Query } = require('mongoose');

//@desc   get all products on the system
//@route  GET /api/v1/products
//@access Public
exports.getProducts = asyncHandler(async(req,res,next) => {
    let query;

    const reqQuery = { ...req.query };

    //fields to exclude, may include SQL queries
    const removeFields = ['select','sort','limit','page'];

    //loop over and remove the fields
    removeFields.forEach(param => delete reqQuery[param]); 

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Product.find(JSON.parse(queryStr));

    //handle if the select value is passed
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //handle if the sort is passed
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query = query.sort('createdAt');
    }

    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalIndex = await Product.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const product = await query;

    //pagination result
    const pagination = {};

    if(endIndex < totalIndex){
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0){
        pagination.prev ={
            page: page - 1,
            limit
        }
    }

    res.status(200).json({
        success : true, 
        count : alert.length,
        pagination,
        data : product
    }); 
});



//@desc   get a single product on the system
//@route  GET /api/v1/product/:id
//@access Public
exports.getProduct = asyncHandler(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new errorResponse(`Product with ID: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success : true, 
        developer : "jabahum", 
        data : product
    });    
});


//@desc   create a new product on the system
//@route  POST /api/v1/products/
//@access Private
exports.createProduct = asyncHandler(async (req,res,next) => {
    const product = await Product.create(req.body);
    console.log("Server_response",product);
    res.status(201).json({ 
        success : true, 
        developer : "jabahum", 
        data : product
    });
});


//@desc   update an alert on the system
//@route  PUT /api/v1/alerts/:id
//@access Private
exports.updateProduct = asyncHandler(async (req,res,next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
         new : true,
         runValidators: true
     });
 
     if(!product){
         return next(new errorResponse(`Product with ID: ${req.params.id} not found!`, 404));
     }
     res.status(200).json({
         success : true, 
         developer : "jabahum", 
         data : product
     });
 });


 //@desc   delete an alert on the system
//@route  DELETE /api/v1/alerts/:id
//@access Private
exports.deleteProduct = asyncHandler(async (req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        return next(new errorResponse(`Product with ID: ${req.params.id} not found!`, 404));
    }
    res.status(200).json({
        success : true, 
        developer : "jabahum",
        data : []
    });
});