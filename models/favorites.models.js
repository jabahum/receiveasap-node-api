//const connectDB = require('mongodb');
const mongoose = require('mongoose');
const errorResponse = require('../utils/errorResponse');

const FavoriteSchema = new mongoose.Schema({
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});


//handle before saving to DB
FavoriteSchema.pre('save', function (next) {
    next();
});

module.exports = mongoose.model('Favorite', FavoriteSchema);