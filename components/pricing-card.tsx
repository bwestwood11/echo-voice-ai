import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const plans = [
  {
    title: "Free",
    price: "0",
    href: "/auth/register",
    priceDescription: "No credit card required",
    description: "Get started for free and upgrade later",
    benefits: [
      "Have Access to All of Our Voices.",
      "Be Able To Generate 2,000 Characters Per Month.",
      "Be Able To Download Any Voice You Generate.",
      "Have Commercial Rights to All Voices You Generate.",
    ],
  },
  {
    title: "Pro",
    price: "19.99",
    href: "/auth/register",
    priceDescription: "Per month",
    color: "text-orange-500",
    description: "Create high quality voices for your videos",
    benefits: [
      "Have Access to All of Our Voices.",
      "Be Able To Generate 30,000 Characters Per Month.",
      "Be Able To Download Any Voice You Generate.",
      "Have Commercial Rights to All Voices You Generate.",
      "Have Access to Support.",
    ],
  },
  {
    title: "Business",
    price: "49.99",
    href: "/auth/register",
    priceDescription: "Per month",
    description: "Create high quality voices for your videos at scale",
    benefits: [
      "Have Access to All of Our Voices.",
      "Be Able To Generate 100,000 Characters Per Month.",
      "Be Able To Download Any Voice You Generate.",
      "Have Commercial Rights to All Voices You Generate.",
      "Have Access to Premium Support.",
    ],
  },
];

const PricingCard = () => {
  return (
    <div className="lg:max-w-7xl z-10 w-full mx-auto items-center justify-center lg:px-10 lg:flex gap-10 md:grid-cols-2 grid-cols-1 grid px-6">
      {plans.map((plan) => (
        <div
          key={plan.title}
          className="border rounded-lg shadow-xl p-4 h-[650px] bg-white lg:w-1/3 mt-20 flex flex-col"
        >
          <div className="flex-grow">
            <h3 className={`${plan.color} font-semibold text-2xl`}>
              {plan.title}
            </h3>
            <p className={`${plan.color} font-bold text-5xl mt-3`}>
              ${plan.price}
            </p>
            <Separator className="my-4" />
            <p className="font-bold text-sm">{plan.priceDescription}</p>
            <p className="mt-8 text-gray-700">{plan.description}</p>
            <ul className="mt-8 space-y-4">
              {plan.benefits?.map((benefit) => (
                <li className="flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  <p className="text-gray-700 tracking-tight">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink">
            <Link href={plan.href}>
              <Button variant="orange" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCard;
