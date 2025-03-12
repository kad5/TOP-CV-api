const { prisma } = require("./config");

const createNewUser = async (username, password) => {
  try {
    return await prisma.user.create({
      data: { username, password },
    });
  } catch (error) {
    console.log("error from db, createNewUser");
    console.log(error);
  }
};
const getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.log("error from db, getUserById");
    console.log(error);
  }
};
const getUserByUserName = async (username) => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (error) {
    console.log("error from db, getUserByUserName");
    console.log(error);
  }
};
const addRefreshToken = async () => {
  try {
  } catch (error) {
    console.log("error from db, checkRefreshToken");
    console.log(error);
  }
};

const checkRefreshToken = async () => {
  try {
  } catch (error) {
    console.log("error from db, checkRefreshToken");
    console.log(error);
  }
};

const updateRefreshToken = async () => {
  try {
  } catch (error) {
    console.log("error from db, checkRefreshToken");
    console.log(error);
  }
};

const deleteRefreshToken = async () => {
  try {
  } catch (error) {
    console.log("error from db, checkRefreshToken");
    console.log(error);
  }
};

const getAllDrafts = async (userId) => {
  try {
    return await prisma.draft.findMany({
      where: { userId },
    });
  } catch (error) {
    console.log("error from db, getAllDrafts");
    console.log(error);
  }
};
const addNewDraft = async (userId, title, content) => {
  try {
    return await prisma.draft.create({
      data: { userId, title, content },
    });
  } catch (error) {
    console.log("error from db, addNewDraft");
    console.log(error);
  }
};
const updateDraft = async (userId, draftId, data) => {
  try {
    const draft = await prisma.draft.updateMany({
      where: { id: draftId, userId },
      data,
    });
    if (draft.count === 0)
      return { error: "Oops,you are not authorized to update this" };
    return draft;
  } catch (error) {
    console.log("error from db, updateDraft");
    console.log(error);
  }
};
const deleteDraft = async (userId, draftId) => {
  try {
    const draft = await prisma.draft.deleteMany({
      where: { id: draftId, userId },
    });
    if (draft.count === 0)
      return { error: "Oops, you are not authorized to delete this" };
    return draft;
  } catch (error) {
    console.log("error from db, deleteDraft");
    console.log(error);
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
