const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getCategory,createCategory,deleteCategory,updateCategory,getCategorys} = require('../controllers/categories.controller');

const router = express.Router();


//major routes of create and get
router.route('/').get(getCategorys).post(createCategory);
//router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getCategory).put(protect,updateCategory).delete(protect,authorize('jabahum'),deleteCategory);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;