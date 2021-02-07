const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getCart,createCart,deleteCart,updateCart,getCarts} = require('../controllers/cart.controllers');

const router = express.Router();


//major routes of create and get
router.route('/').get(getCarts).post(createCart);
//router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getCart).put(protect,updateCart).delete(protect,authorize('jabahum'),deleteCart);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;