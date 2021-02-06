//const connectDB = require('mongodb');
const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const ProductSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    categoryId:String,
    price: Number,
    unitOfMeasure: String,
    supplierName: String,
    description: String,
    imageUrl: String,
    stock: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});


//handle before saving to DB
ProductSchema.pre('save', function (next) {
    if (this.name === "Other") {
        //other.required = [true,"Please specify the 'Other' alert type"];
        if (!this.other) {
            return next(new errorResponse(`Please specify the Other type of alert`, 400));
        }
        return next();
    }
    next();
});

module.exports = mongoose.model('Product', ProductSchema);