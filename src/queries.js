const { prisma } = require("./prisma-config");

const createNewUser = async (username, password) => {
  try {
    return await prisma.user.create({ data: { username, password } });
  } catch (error) {
    throw new Error("Database error: Unable to create user");
  }
};

const getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (error) {
    throw new Error("Database error: Unable to fetch user");
  }
};

const getUserByUserName = async (username) => {
  try {
    return await prisma.user.findUnique({ where: { username } });
  } catch (error) {
    throw new Error("Database error: Unable to fetch user");
  }
};

const addRefreshToken = async (userId, token) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    return await prisma.refreshToken.upsert({
      where: { userId },
      update: {
        token,
        expiresAt,
      },
      create: {
        userId,
        token,
        expiresAt,
      },
    });
  } catch (error) {
    throw new Error("Database error: Unable to add refresh token");
  }
};

const checkRefreshToken = async (token) => {
  try {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!storedToken) return null;
    if (new Date(storedToken.expiresAt) < new Date()) {
      await deleteRefreshToken(token);
      return null;
    }
    return storedToken;
  } catch (error) {
    throw new Error("Database error: Unable to check refresh token");
  }
};

const updateRefreshToken = async (oldToken, newToken) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    return await prisma.refreshToken.update({
      where: { token: oldToken },
      data: { token: newToken, expiresAt },
    });
  } catch (error) {
    throw new Error("Database error: Unable to update refresh token");
  }
};

const deleteRefreshToken = async (token) => {
  try {
    return await prisma.refreshToken.deleteMany({ where: { token } });
  } catch (error) {
    throw new Error("Database error: Unable to delete refresh token");
  }
};

const getAllDrafts = async (userId) => {
  try {
    return await prisma.draft.findMany({ where: { userId } });
  } catch (error) {
    throw new Error("Database error: Unable to fetch drafts");
  }
};

const addNewDraft = async (userId, title, content) => {
  try {
    return await prisma.draft.create({ data: { userId, title, content } });
  } catch (error) {
    throw new Error("Database error: Unable to create draft");
  }
};

const updateDraft = async (userId, draftId, data) => {
  try {
    return await prisma.draft.update({
      where: { id: draftId, userId },
      data,
    });
  } catch (error) {
    throw new Error("Database error: Unable to update draft");
  }
};

const deleteDraft = async (userId, draftId) => {
  try {
    return await prisma.draft.delete({
      where: { id: draftId, userId },
    });
  } catch (error) {
    throw new Error("Database error: Unable to delete draft");
  }
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByUserName,
  addRefreshToken,
  checkRefreshToken,
  updateRefreshToken,
  deleteRefreshToken,
  getAllDrafts,
  addNewDraft,
  updateDraft,
  deleteDraft,
};
