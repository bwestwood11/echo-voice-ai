import { checkSubscription, subscriptionData } from "@/lib/subscription";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { SubscriptionButton } from "@/components/subscription-button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings!",
  alternates: {
    canonical: "https://www.voicefusion.io/settings",
  },
};

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  const session = await currentUser();
  console.log('session object', session)
  const subscription = await subscriptionData();
  console.log("single subscription", subscription);
  return (
    <div className="h-screen bg-slate-100">
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md bg-gray-700/10")}>
          <Settings className={cn("w-10 h-10 text-gray-700")} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage Account Settings
          </p>
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-gray-500 text-sm">
          {isPro
            ? "You are currently on a pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
      <div>
        <div className="mt-6 px-4 lg:px-8 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session?.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {session?.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Plan
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {isPro ? "Premium Plan" : "Free Plan"}{" "}
                <Badge className="ml-4 bg-green-600">
                  {isPro ? "Active" : "Not Active"}
                </Badge>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Renewal Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {subscription?.stripeCurrentPeriodEnd
                  ? new Date(
                      subscription?.stripeCurrentPeriodEnd
                    ).toLocaleString()
                  : "n/a"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Renewal Amount
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {isPro ? "$19.99" : "$0"}
              </dd>
            </div>
          </dl>{" "}
        {session?.isOAuth ? (
         null 
        ):(<> 
          <Link href='/settings/edit'><Button>Edit Profile</Button></Link> 
          </>)}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
