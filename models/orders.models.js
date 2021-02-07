//const connectDB = require('mongodb');
const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const OrderSchema = new mongoose.Schema({
    cartId:String,
    productId:String,
    status:Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});


//handle before saving to DB
OrderSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Order', OrderSchema);