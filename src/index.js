const { prisma } = require("../db/config");

async function findUsersSortedByAgeAndName() {
  return await prisma.user.findMany({
    orderBy: [{ age: "asc" }, { name: "asc" }],
  });
}

module.exports = { findUsersSortedByAgeAndName };
