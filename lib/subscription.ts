import { currentUser } from "./auth";

import { database } from "./prismadb";


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = await currentUser();

  if (!session?.id || !session) {
    return false;
  }

  const userSubscription = await database.userSubscription.findUnique({
    where: {
      userId: session.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};

export const subscriptionData = async () => {
  const session = await currentUser();

  if (!session?.id || !session) {
    return null;
  }

  const userSubscription = await database.userSubscription.findUnique({
    where: {
      userId: session?.id,
    },
  });

  if (!userSubscription) {
    return null;
  }

  return userSubscription;
};
