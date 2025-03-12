const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyAccess = asyncHandler(async (req, res) => {});

module.exports = { prisma, verifyAccess };
