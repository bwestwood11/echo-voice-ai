import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"

const montserrat = Montserrat({
    subsets: ["latin-ext"],
})


const WhyUs = () => {
  return (
    <div className="w-full h-full mt-20">
    <div className="max-w-7xl mx-auto text-center px-6">
        <h3 className={cn(montserrat.className, "mb-6")}>Voice Fusion <span className="text-[#ff8303]">Benefits</span></h3>
    <p className="font-base max-w-3xl mx-auto text-gray-600">The most natural sounding AI voices to generate amazing content for your business, YouTube channel, podcast, </p>
    </div>
</div>
  )
}

export default WhyUs