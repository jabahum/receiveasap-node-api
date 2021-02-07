const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//const Alert = require('../models/Alert');
const Favorite = require('../models/favorites.models')
const { Query } = require('mongoose');


//@desc   get all products on the system
//@route  GET /api/v1/orders
//@access Public
exports.getFavorites = asyncHandler(async(req,res,next) => {
    let query;

    const reqQuery = { ...req.query };

    //fields to exclude, may include SQL queries
    const removeFields = ['select','sort','limit','page'];

    //loop over and remove the fields
    removeFields.forEach(param => delete reqQuery[param]); 

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Favorite.find(JSON.parse(queryStr));

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
    const totalIndex = await Favorite.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const favorite = await query;

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
        count : favorite.length,
        pagination,
        data : favorite
    }); 
});


//@desc   get a single product on the system
//@route  GET /api/v1/orders/:id
//@access Public
exports.getFavorite = asyncHandler(async (req,res,next) => {
    const favorite = await Favorite.findById(req.params.id);

    if(!favorite){
        return next(new errorResponse(`Favorite with ID: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success : true, 
        developer : "jabahum", 
        data : favorite
    });    
});


//@desc   create a new product on the system
//@route  POST /api/v1/orders/
//@access Private
exports.createFavorite = asyncHandler(async (req,res,next) => {
    const favorite = await Favorite.create(req.body);
    console.log("Server_response",order);
    res.status(201).json({ 
        success : true, 
        developer : "jabahum", 
        data : favorite
    });
});


//@desc   update an alert on the system
//@route  PUT /api/v1/orders/:id
//@access Private
exports.updateFavorite = asyncHandler(async (req,res,next) => {
    const favorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, {
         new : true,
         runValidators: true
     });
 
     if(!favorite){
         return next(new errorResponse(`Favorite with ID: ${req.params.id} not found!`, 404));
     }
     res.status(200).json({
         success : true, 
         developer : "jabahum", 
         data : favorite
     });
 });


 //@desc   delete an alert on the system
//@route  DELETE /api/v1/orders/:id
//@access Private
exports.deleteFavorite = asyncHandler(async (req,res,next) => {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);
    if(!favorite){
        return next(new errorResponse(`Favorite with ID: ${req.params.id} not found!`, 404));
    }
    res.status(200).json({
        success : true, 
        developer : "jabahum",
        data : []
    });
});