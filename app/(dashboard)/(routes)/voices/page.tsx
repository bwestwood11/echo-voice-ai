
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"


const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
})

const voices = [
    {
        name: "John",
        voiceID: "GBv7mTt0atIp3Br8iCZE",
        accent: "American",
        image: "/male1.png",
        audio: "/americanman1.mp3"
    },
    {
        name: "Rachel",
        voiceID: "21m00Tcm4TlvDq8ikWAM", 
        accent: "American",
        image: "/girl3.png",
        audio: "/americanwoman1.mp3"
    },
    {
        name: "Clyde",
        voiceID: "2EiwWnXFnvU5JabPnv8n",
        accent: "American",
        image: "/male2.png",
        description: "war veteran"
    },
    {
        name: "Domi",
        voiceID: 'AZnzlk1XvdvUeBnXmlld',
        accent: "American",
        image: "/girl4.png",
    },
    {
        name: "Dave",
        voiceID: "CYw3kZ02Hs0563khs1Fj",
        accent: "American",
        image: "/girl4.png",
    },
    {
        name: "Fin",
        voiceID: "D38z5RcWu1voky8WS1ja",
        accent: "Irish",
        image: "/male3.png",
    },
    {
        name: "Rachel",
        accent: "American",
        image: "/girl4.png",
    },
    {
        name: "Rachel",
        accent: "American",
        image: "/girl4.png",
    },
]



const VoicesPage = () => {
  
  return (
    <div className="w-full text-center">
         <h1 className={cn("font-bold text-3xl", montserrat.className)}>Pick the voice you would like to try!</h1>
         <p className="mt-4 text-gray-500">Check out their voice by clicking on the audio button</p>
         <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">
                {voices.map((voice) => (
                    <div className="flex flex-col" key={voice.voiceID}>
                        <Link href={`/yourvoices/${voice.voiceID}`}>
                        <Image
                            className="mx-auto cursor-pointer hover:border-2 hover:border-gray-100 hover:rounded-lg"
                            src={voice.image}
                            alt={voice.name}
                            width={200}
                            height={200}
                        />
                        </Link>
                        <div className="flex flex-row gap-2 mx-auto mb-6">
                             <h3 className="font-semibold">{voice.name}</h3>
                             <p>{voice.accent} accent</p>       
                               </div>
                                <audio className="self-center" controls>
                                    <source src={voice.audio} type="audio/mpeg" />
                                </audio>
                       <p className="mt-2 font-semibold">{voice.description}</p>
                </div>
                ))};
         </div>
    </div>
  )
}

export default VoicesPage;