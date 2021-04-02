const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//const Alert = require('../models/Alert');
const Banner = require("../models/banner.models");
const { Query } = require("mongoose");

//@desc   get all banners on the system
//@route  GET /api/v1/banners
//@access Public
exports.getBanners = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  //fields to exclude, may include SQL queries
  const removeFields = ["select", "sort", "limit", "page"];

  //loop over and remove the fields
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Banner.find(JSON.parse(queryStr));

  //handle if the select value is passed
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //handle if the sort is passed
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalIndex = await Banner.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const banner = await query;

  //pagination result
  const pagination = {};

  if (endIndex < totalIndex) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: banner.length,
    pagination,
    data: banner,
  });
});

//@desc   get a single banner on the system
//@route  GET /api/v1/banners/:id
//@access Public
exports.getBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    return next(
      new errorResponse(`Banner with ID: ${req.params.id} not found!`, 404)
    );
  }

  res.status(200).json({
    success: true,
    developer: "jabahum",
    data: banner,
  });
});

//@desc   create a new product on the system
//@route  POST /api/v1/banners/
//@access Private
exports.createBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.create(req.body);
  console.log("Server_response", banner);
  res.status(201).json({
    success: true,
    developer: "jabahum",
    data: banner,
  });
});

//@desc   update an banner on the system
//@route  PUT /api/v1/banners/:id
//@access Private
exports.updateBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!banner) {
    return next(
      new errorResponse(`Banner with ID: ${req.params.id} not found!`, 404)
    );
  }
  res.status(200).json({
    success: true,
    developer: "jabahum",
    data: banner,
  });
});

//@desc   delete an banner on the system
//@route  DELETE /api/v1/banners/:id
//@access Private
exports.deleteBanner = asyncHandler(async (req, res, next) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  if (!banner) {
    return next(
      new errorResponse(`Category with ID: ${req.params.id} not found!`, 404)
    );
  }
  res.status(200).json({
    success: true,
    developer: "jabahum",
    data: [],
  });
});
