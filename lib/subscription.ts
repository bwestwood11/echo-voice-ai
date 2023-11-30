import { getServerSession } from "next-auth";

import prismadb from "./prismadb";
import { authOptions } from "@/utils/authOptions";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id || !session) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: session.user.id,
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
  const session = await getServerSession(authOptions);

  if (!session?.user.id || !session) {
    return null;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: session?.user.id,
    },
  });

  if (!userSubscription) {
    return null;
  }

  return userSubscription;
};
