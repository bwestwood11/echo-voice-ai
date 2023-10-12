import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
    subsets: ["latin-ext"],
})
// width="640" height="360"
const VideoSection = () => {
  return (
    <div className="w-full h-full">
        <div className="max-w-7xl mx-auto text-center px-6">
            <h3 className={cn(montserrat.className, "font-extrabold text-3xl uppercase mb-6")}>Video <span className="text-[#ff8303]">Editing</span></h3>
        <p className="font-semibold ">Add your generated AI voices to your clips. Simply drag and drop your audio and video files to see your final project.</p>
        </div>
        <iframe className="justify-center w-full mt-10" title="vimeo-player" src="https://player.vimeo.com/video/873579154?h=d4e7fc5795" width="640" height="360"></iframe>
    </div>
  )
}

export default VideoSection