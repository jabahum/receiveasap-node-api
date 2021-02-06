const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Alert = require('../models/Alert');
const Category = require('../models/categories.models')
const { Query } = require('mongoose');


//@desc   get all products on the system
//@route  GET /api/v1/categorys
//@access Public
exports.getCategorys = asyncHandler(async(req,res,next) => {
    let query;

    const reqQuery = { ...req.query };

    //fields to exclude, may include SQL queries
    const removeFields = ['select','sort','limit','page'];

    //loop over and remove the fields
    removeFields.forEach(param => delete reqQuery[param]); 

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Category.find(JSON.parse(queryStr));

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
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalIndex = await Category.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const category = await query;

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
        count : category.length,
        pagination,
        data : category
    }); 
});


//@desc   get a single product on the system
//@route  GET /api/v1/category/:id
//@access Public
exports.getCategory = asyncHandler(async (req,res,next) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        return next(new errorResponse(`Category with ID: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success : true, 
        developer : "jabahum", 
        data : category
    });    
});


//@desc   create a new product on the system
//@route  POST /api/v1/categorys/
//@access Private
exports.createCategory = asyncHandler(async (req,res,next) => {
    const category = await Category.create(req.body);
    console.log("Server_response",category);
    res.status(201).json({ 
        success : true, 
        developer : "jabahum", 
        data : category
    });
});


//@desc   update an alert on the system
//@route  PUT /api/v1/categorys/:id
//@access Private
exports.updateCategory = asyncHandler(async (req,res,next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
         new : true,
         runValidators: true
     });
 
     if(!category){
         return next(new errorResponse(`Category with ID: ${req.params.id} not found!`, 404));
     }
     res.status(200).json({
         success : true, 
         developer : "jabahum", 
         data : category
     });
 });


 //@desc   delete an alert on the system
//@route  DELETE /api/v1/alerts/:id
//@access Private
exports.deleteCategory = asyncHandler(async (req,res,next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category){
        return next(new errorResponse(`Category with ID: ${req.params.id} not found!`, 404));
    }
    res.status(200).json({
        success : true, 
        developer : "jabahum",
        data : []
    });
});