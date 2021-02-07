const express = require('express');

//import route protection with JWT TOken
const { protect} = require('../middleware/auth');

const { createUser, loginUser, getMe } = require('../controllers/auth.controllers');

const router = express.Router();

//major routes of create and get
router.route('/').post(createUser); 

router.route('/login').post(loginUser);

router.route('/me').get(getMe);

module.exports = router;