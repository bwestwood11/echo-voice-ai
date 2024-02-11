import { currentUser } from "./auth";

import { database } from "@/lib/prismadb";
import { MAX_FREE_CHARACTERS, MAX_PRO_CHARACTERS } from "@/constants";

// Increase the user's free character count by the number of characters in the text
export const increaseFreeCharacterCount = async (characterCount: number) => {
  // get the user's session from the server
  const session = await currentUser();

  if (!session) return false;

  // retrieve the user's api limit from the database
  const freeUserCharacterCount = await database.freeCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's api limit exists, update the count
  if (freeUserCharacterCount) {
    await database.freeCharacterLimit.update({
      where: {
        userId: session.id,
      },
      data: {
        characterCount: freeUserCharacterCount.characterCount + characterCount,
        count: freeUserCharacterCount.count + 1,
      },
    });
  } else {
    // if the user's api limit does not exist, create a new one
    await database.freeCharacterLimit.create({
      data: {
        userId: session.id,
        characterCount: 0 + characterCount,
        count: 1,
      },
    });
  }
};

export const checkFreeCharacterCount = async () => {
  // get the user's session from the server
  const session = await currentUser();
  if (!session) return false;

  // retrieve the user's api limit from the database
  const userApiLimit = await database.freeCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's api limit does not exist or is less than 5 free tries, return true
  if (!userApiLimit || userApiLimit.characterCount < MAX_FREE_CHARACTERS) {
    return true;
  } else {
    return false;
  }
};

export const checkProCharacterLimit = async () => {
  // get the user's session from the server
  const session = await currentUser();

  if (!session) return false;

  const userCharacterLimit = await database.proUserCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  if (
    !userCharacterLimit ||
    userCharacterLimit.characterCount < MAX_PRO_CHARACTERS
  ) {
    return true;
  } else {
    return false;
  }
};

export const getFreeCharacterCount = async () => {
  // get the user's session from the server
  const session = await currentUser();

  if (!session) return false;

  // retrieve the user's api limit from the database
  const userApiLimit = await database.freeCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's api limit does not exist, return 0
  if (!userApiLimit) return 0;

  // return the user's api limit count
  return userApiLimit.characterCount;
};

export const getFreeTotalCount = async () => {
  // get the user's session from the server
  const session = await currentUser();

  if (!session) return false;

  // retrieve the user's api limit from the database
  const userApiLimit = await database.freeCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's api limit does not exist, return 0
  if (!userApiLimit) return 0;

  // return the user's api limit count
  return userApiLimit.count;
};

export const increaseProCharacterCount = async (characterCount: number) => {
  // get the user's session from the server
  const session = await currentUser();
  if (!session) return false;
  console.log("character count", characterCount);
  // retrieve the user's character count from the database
  const userCharacterCount = await database.proUserCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  console.log("userCharacterCount", userCharacterCount);

  if (userCharacterCount) {
    await database.proUserCharacterLimit.update({
      where: {
        userId: session.id,
      },
      data: {
        characterCount: userCharacterCount.characterCount + characterCount,
        count: userCharacterCount.count + 1,
      },
    });
  } else {
    // if the user's character count does not exist, create a new one
    await database.proUserCharacterLimit.create({
      data: {
        userId: session.id,
        count: characterCount,
      },
    });
  }
  console.log("userCharacterCount", userCharacterCount);
};

export const getProCharacterCount = async () => {
  // get the user's session from the server
  const session = await currentUser();
  console.log("session", session);
  if (!session) return false;

  // retrieve the user's character count from the database
  const userCharacterCount = await database.proUserCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's character count does not exist, return 0
  if (!userCharacterCount) return 0;

  // return the user's character count
  return userCharacterCount.characterCount;
};

export const getProTotalCount = async () => {
  // get the user's session from the server
  const session = await currentUser();
  console.log("session", session);
  if (!session) return false;

  // retrieve the user's character count from the database
  const userCharacterCount = await database.proUserCharacterLimit.findUnique({
    where: {
      userId: session.id,
    },
  });

  // if the user's character count does not exist, return 0
  if (!userCharacterCount) return 0;

  // return the user's character count
  return userCharacterCount.count;
};

export const getAudioFiles = async () => {
  const session = await currentUser();
  if (!session) return false;

  const audioFiles = await database.audioFile.findMany({
    where: {
      userId: session.id,
    },
  });

  return audioFiles;
};
