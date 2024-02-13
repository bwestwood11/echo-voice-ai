import { database } from "@/lib/prismadb";

// Get a user by their email address
export const getUserByEmail = async (email: string) => {
  try {
    const user = await database.user.findUnique({
      where: {
        email,
      },
    });
  console.log("user in getUserByEmail", user);
    return user;
  } catch (error) {
    return null;
  }
};

// Get a user by their ID
export const getUserByID = async (id: string) => {
    try {
      const user = await database.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  };