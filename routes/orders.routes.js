const express = require('express');
//import route protection with JWT TOken
const { protect, authorize} = require('../middleware/auth');

const { getOrder,createOrder,deleteOrder,updateOrder,getOrders} = require('../controllers/orders.controllers');

const router = express.Router();


//major routes of create and get
router.route('/').get(getOrders).post(createOrder);
//router.route('/').get(protect,authorize('developer'),getProducts).post(protect,createProduct);

//functional alerts of getone, update and delete
router.route('/:id').get(protect,getOrder).put(protect,updateOrder).delete(protect,authorize('jabahum'),deleteOrder);

//route to get alert by district
//router.route('/area/:area').get(protect,authorize('developer'),getAlertByArea);

module.exports = router;