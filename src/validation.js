const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res, next) => {
  const { username, password, confirm } = req.body;
  let errors = [];
  if (username.trim() === "") errors.push("username cannot be empty");
  if (password.trim() === "") errors.push("password cannot be empty");
  if (password !== confirm) errors.push("passwords must match");

  if (errors.length > 0) return res.status(400).json({ errors: errors });
  next();
});
const post = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || title.trim() === "")
    return res.status(400).json({ message: "You must set a title" });
  if (!validateJSON(content))
    return res.status(400).json({ message: "Invalid data, please try again" });
  next();
});
const update = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || title.trim() === "")
    return res.status(400).json({ message: "You must set a title" });
  if (!validateJSON(content))
    return res.status(400).json({ message: "Invalid data, please try again" });
  next();
});

const validateJSON = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = { signup, post, update };
