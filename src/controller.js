const asyncHandler = require("express-async-handler");
const queries = require("./queries");
const argon2 = require("argon2");

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const isTaken = await queries.getUserByUserName(username);
  if (isTaken)
    return res.status(409).json({ message: "This username is already taken" });

  const hashedPassword = await argon2.hash(password);
  const user = await queries.createNewUser(username, hashedPassword);

  return res.status(200).json({ user });
});
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await queries.getUserByUserName(username);
  if (!user) return res.status(401).json({ message: "invalid username" });

  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch)
    res.status(401).json({ message: "invalid username or password" });

  return res.status(200).json({ user });
});
const logout = asyncHandler(async (req, res) => {
  const user = req.body.userId;
  console.log(`user ${user} just logged out`);

  return res.status(200).json({ user });
});
const refreshToken = asyncHandler(async (req, res) => {});
const getAllDrafts = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const drafts = await queries.getAllDrafts(userId);

  return res.status(200).json({ drafts });
});
const addNewDraft = asyncHandler(async (req, res) => {
  const { userId, title, content } = req.body;

  const newDraft = await queries.addNewDraft(userId, title, content);

  return res.status(200).json({ newDraft });
});
const updateDraft = asyncHandler(async (req, res) => {
  const { userId, draftId, data } = req.body;

  const updatedDraft = await queries.updateDraft(userId, draftId, data);

  return res.status(200).json({ updatedDraft });
});
const deleteDraft = asyncHandler(async (req, res) => {
  const { userId, draftId } = req.body;

  const deletedDraft = await queries.deleteDraft(userId, draftId);

  return res.status(200).json({ deletedDraft });
});

module.exports = {
  signup,
  login,
  logout,
  refreshToken,
  getAllDrafts,
  addNewDraft,
  updateDraft,
  deleteDraft,
};
