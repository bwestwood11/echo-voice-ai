import NavigationBar from "@/components/Home-Navbar";
import PricingOptions from "@/components/pricing-options";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description: "View our pricing plans!",
  alternates: {
    canonical: "https://www.voicefusion.io/pricing",
  },
};


const PricingPage = () => {
  return (
    <section>
      <NavigationBar />
      <PricingOptions />
    </section>
  )
}

export default PricingPage