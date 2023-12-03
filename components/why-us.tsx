import { Montserrat } from "next/font/google"
import { cn } from "@/lib/utils"
import Image from "next/image"

const montserrat = Montserrat({
    subsets: ["latin-ext"],
})

const benefits = [
  {
    title: 'Natural Sounding Voices',
    description: 'The most natural sounding AI voices to generate amazing content for your business, YouTube channel, podcast, ',
    image: '/microphone-image.png'
  },
  {
    title: 'Save Money',
    description: 'Instead of paying a voice actor for every project, you can generate realistic voices for a fraction of the cost.',
    image: '/money-img.png'
  },
  {
    title: 'Save Time',
    description: 'Do not waste time waiting for voice actors to record your script. Generate your voiceover in seconds.',
    image: '/time.png'
  },
]

const WhyUs = () => {
  return (
    <div className="w-full h-full mt-20">
    <div className="max-w-7xl mx-auto text-center px-6">
        <h3 className={cn(montserrat.className, "mb-6")}>Voice Fusion <span className="text-[#ff8303]">Benefits</span></h3>
    <p className="font-base max-w-xl mx-auto text-gray-600">The most natural sounding AI voices to generate amazing content for your business, YouTube channel, podcast, and more </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 mt-10 px-10">
    {benefits.map((benefit) => (
      <div key={benefit.title}>
        <div className="flex flex-col items-center">
          <Image src={benefit.image} alt={benefit.title} width={170} height={170} />
          <h3 className="font-semibold text-2xl mt-4 capitalize">{benefit.title}</h3>
          <p className="font-base text-gray-600 mt-2">{benefit.description}</p>
        </div>
      </div>
        ))}
        </div>
    </div>
</div>
  )
}

export default WhyUs