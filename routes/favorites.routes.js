const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getFavorite,createFavorite,deleteFavorite,updateFavorite,getFavorites} = require('../controllers/favorites.controllers');

const router = express.Router();


//major routes of create and get
router.route('/').get(getFavorites).post(createFavorite);
//router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getFavorite).put(protect,updateFavorite).delete(protect,authorize('jabahum'),deleteFavorite);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;