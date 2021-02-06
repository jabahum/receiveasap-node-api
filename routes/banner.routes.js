const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getBanner,createBanner,deleteBanner,updateBanner,getBanners} = require('../controllers/banner.controllers');

const router = express.Router();


//major routes of create and get
router.route('/').get(getBanners).post(createBanner);
//router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getBanner).put(protect,updateBanner).delete(protect,authorize('jabahum'),deleteBanner);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;