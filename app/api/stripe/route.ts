import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { database } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";


const settings = absoluteUrl("/settings");

// This route is for creating a checkout session or if a pro member then retrieves the billing portal session
export async function GET() {
    try {
        const session = await currentUser();

        if (!session?.id || !session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const userSubscription = await database.userSubscription.findUnique({
            where: {
                userId: session.id
            }
        });

        // If the user has a subscription, redirect them to the billing portal
        if (userSubscription && userSubscription.stripeCustomerId) {
             const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settings,
            });

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // Otherwise, create a new checkout session
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settings,
            cancel_url: settings,
            payment_method_types: ["card"],
            mode: "subscription",
            customer_email: session.email,
            line_items: [
                  {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                  },
            ],
            metadata: {
                userId: session.id
            }
        });
                
   return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        

    } catch (error) {
    console.log("Stripe error", error);
    return new NextResponse("Stripe error", { status: 500 });
    }
}