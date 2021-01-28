const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getProduct,createProduct,deleteProduct,updateProduct,getProducts} = require('../controllers/products.controllers');

const router = express.Router();


//major routes of create and get
router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getProduct).put(protect,updateProduct).delete(protect,authorize('jabahum'),deleteProduct);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;