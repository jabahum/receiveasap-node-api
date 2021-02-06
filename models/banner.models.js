//const connectDB = require('mongodb');
const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const BannerSchema = new mongoose.Schema({
    bannerName: String,
    bannerId:String,
    bannerUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});


//handle before saving to DB
BannerSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Banner', BannerSchema);