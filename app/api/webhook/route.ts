import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { database } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await database.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id as string,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log(subscription);
    await database.userSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id as string,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });

    // Update the count in the Prisma database
    const userApiLimit = await database.proUserCharacterLimit.findUnique({
      where: {
        userId: session?.metadata?.userId,
      },
    });

    // if the user's api limit exists, update the count
    if (userApiLimit) {
      await database.proUserCharacterLimit.update({
        where: {
          userId: session?.metadata?.userId,
        },
        data: {
          characterCount: (userApiLimit.characterCount = 0),
          count: (userApiLimit.count = 0),
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
}
