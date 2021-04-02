const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/user.models");
const ErrorResponse = require("../utils/errorResponse");

//@desc   Register users on the system
//@route  POST /api/v1/auth
//@access Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, number, email, password } = req.body;

  const user = await User.create(req.body);
  console.log("Server_response", user);
  //send a token
  sendTokenResponse(user, 200, res);
});

//@desc   Login users on the system
//@route  POST /api/v1/auth/login
//@access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  //validate email and password
  if (!email) {
    return next(new ErrorResponse("Please provide a username", 400));
  }
  if (!password) {
    return next(new ErrorResponse("Please provide a password", 400));
  }

  //check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid username", 401));
  }

  //check if password matches
  const passwordVerify = await user.verifyPassword(password);
  if (!passwordVerify) {
    return next(new ErrorResponse("Invalid password", 401));
  }
  //create a token
  const token = user.getSignedJwtToken();

  sendTokenResponse(user, 200, res);
});

//function to get token from model and create cookie then send response to user
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), //cookie expires in 30days from creation
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

//@desc   Get the current loggedin User
//@route  POST /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
