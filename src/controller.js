const asyncHandler = require("express-async-handler");
const queries = require("./queries");
const argon2 = require("argon2");
const { generateAccessToken, generateRefreshToken } = require("./auth");

const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const isTaken = await queries.getUserByUserName(username);
  if (isTaken)
    return res.status(409).json({ message: "This username is already taken" });

  const hashedPassword = await argon2.hash(password);
  const user = await queries.createNewUser(username, hashedPassword);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await queries.addRefreshToken(user.id, refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  return res
    .status(201)
    .json({ id: user.id, username: user.username, accessToken });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await queries.getUserByUserName(username);
  if (!user) return res.status(401).json({ message: "invalid username" });

  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch)
    return res.status(401).json({ message: "invalid username or password" });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await queries.addRefreshToken(user.id, refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  return res
    .status(200)
    .json({ id: user.id, username: user.username, accessToken });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(400).json({ message: "No token provided" });

  await queries.deleteRefreshToken(refreshToken);

  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out successfully" });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  const storedToken = await queries.checkRefreshToken(refreshToken);
  if (!storedToken) return res.status(403).json({ message: "Forbidden" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = generateAccessToken({ id: decoded.id });
    const newRefreshToken = generateRefreshToken({ id: decoded.id });

    await queries.updateRefreshToken(refreshToken, newRefreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
});

const getAllDrafts = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const drafts = await queries.getAllDrafts(userId);

  return res.status(200).json({ drafts });
});
const addNewDraft = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { title, content } = req.body;

  const newDraft = await queries.addNewDraft(userId, title, content);

  return res.status(200).json({ newDraft });
});
const updateDraft = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { draftId, data } = req.body;

  const updatedDraft = await queries.updateDraft(userId, draftId, data);
  return res.status(200).json({ updatedDraft });
});
const deleteDraft = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { draftId } = req.body;

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
