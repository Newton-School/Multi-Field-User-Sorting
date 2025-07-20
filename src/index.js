const { prisma } = require("../db/config");

async function findUsersSortedByAgeAndName() {
  try {
    const users = await prisma.user.findMany({
      orderBy: [
        { age: 'asc' },
        { name: 'asc' } // Prisma uses case-sensitive sort by default
      ],
      select: {
        id: true,
        name: true,
        age: true
      }
    });

    // Manually perform case-insensitive sort for names with same age
    return users.sort((a, b) => {
      if (a.age !== b.age) return a.age - b.age;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

module.exports = { findUsersSortedByAgeAndName };
