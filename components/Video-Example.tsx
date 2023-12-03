import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const montserrat = Montserrat({
    subsets: ["latin-ext"],
})
// width="640" height="360"
const VideoSection = () => {
  return (
    <div className="w-full h-full relative z-10">
      <Image 
      src='/wave.png'
      alt="background"
      className="top-0 z-[-1]"
      layout="fill"
      />
        <div className="max-w-7xl mx-auto text-center px-6">
            <h3 className={cn(montserrat.className, "font-extrabold text-3xl uppercase mb-6")}>Match Up Your Video with <span className="text-[#ff8303]">Our AI Voices</span></h3>
        <p className="font-base ">Add your generated AI voices to your clips. Simply drag and drop your audio and video files to see your final project.</p>
        </div>
        <iframe className="justify-center w-full mt-10 px-8" title="vimeo-player" src="https://player.vimeo.com/video/873579154?h=d4e7fc5795" width="640" height="360"></iframe>
    </div>
  )
}

export default VideoSection