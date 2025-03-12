const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res, next) => {
  next();
});
const post = asyncHandler(async (req, res, next) => {
  next();
});
const update = asyncHandler(async (req, res, next) => {
  next();
});

module.exports = { signup, post, update };
