//const connectDB = require('mongodb');
const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const CategorySchema = new mongoose.Schema({
    name: String,
    categoryId:String,
    description: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});


//handle before saving to DB
CategorySchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Category', CategorySchema);