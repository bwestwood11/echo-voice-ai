import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const voices = [
  {
    name: "John",
    voiceID: "GBv7mTt0atIp3Br8iCZE",
    accent: "American",
    image: "/male1.png",
    audio: "/johnamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Glinda",
    voiceID: "z9fAnlkpzviPz146aGWa",
    accent: "American",
    image: "/girl5.png",
    audio: "/glindaamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Fin",
    voiceID: "D38z5RcWu1voky8WS1ja",
    accent: "Irish",
    image: "/male3.png",
    audio: "/finirishvoice.mp3",
    flag: "/irish.png",
  },
  {
    name: "Charlie",
    voiceID: "IKne3meq5aSn9XLyUdCD",
    accent: "Australian",
    image: "/male4.png",
    audio: "/charlieaustralianvoice.mp3",
    flag: "/australian.png",
  },
  {
    name: "Rachel",
    voiceID: "21m00Tcm4TlvDq8ikWAM",
    accent: "American",
    image: "/girl3.png",
    audio: "/rachelamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Clyde",
    voiceID: "2EiwWnXFnvU5JabPnv8n",
    accent: "American",
    image: "/male6.png",
    audio: "/clydeamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Domi",
    voiceID: "AZnzlk1XvdvUeBnXmlld",
    accent: "American",
    image: "/girl4.png",
    audio: "/domiamericanvoice.mp3",
    flag: "/american.png",
  },

  {
    name: "Nicole",
    voiceID: "piTKgcLEGmPE4e6mEKli",
    accent: "American",
    image: "/girl6.png",
    audio: "/nicoleamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Dave",
    voiceID: "CYw3kZ02Hs0563khs1Fj",
    accent: "British",
    image: "/britishman1.png",
    audio: "/davebritishvoice.mp3",
    flag: "/britishflag.png",
  },
  {
    name: "Dorothy",
    voiceID: "ThT5KcBeYPX3keUQqHPh",
    accent: "British",
    image: "/britishwoman2.png",
    audio: "/dorothybritishvoice.mp3",
    flag: "/britishflag.png",
  },
  {
    name: "Arnold",
    voiceID: "VR6AewLTigWG4xSOukaG",
    accent: "American",
    image: "/arnoldimage.png",
    audio: "/arnoldamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Charlotte",
    voiceID: "XB0fDUnXU5powFXDhCwa",
    accent: "American",
    image: "/charlotteimage.png",
    audio: "/charlotteamericanvoice.mp3",
    flag: "/american.png",
  },
  {
    name: "Joanne",
    voiceID: "JzxOoJpXoKVTtjCHhQhY",
    accent: "American",
    image: "/charlotteimage.png",
    audio: "/joanne-voice.mp3",
    flag: "/american.png",
  },
];

const VoicesPage = async () => {
  return (
    <div className="w-full text-center bg-slate-100">
      <h1 className={cn("font-extrabold text-3xl px-8", montserrat.className)}>
        Pick the voice you would like to try!
      </h1>
      <p className="mt-4 px-12">
        Check out their voice by clicking on the audio button. If you like the
        voice, click on their image to start creating your content!
      </p>

      {/* Maps through all the voices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">
        {voices.map((voice) => (
          <div className="flex flex-col" key={voice.voiceID}>
            <Link
              href={`/your-voices/${voice.voiceID}&image=${voice.image}&name=${voice.name}&flag=${voice.flag}`}
            >
              <Image
                className="mx-auto cursor-pointer hover:border-2 hover:border-gray-100 hover:rounded-lg"
                src={voice.image}
                alt={voice.name}
                width={200}
                height={200}
              />
            </Link>
            <div className="flex flex-row gap-2 mx-auto mb-6 items-center">
              <h3 className="font-semibold text-2xl">{voice.name}</h3>
              <Image src={voice.flag} alt={voice.name} width={50} height={50} />
            </div>
            <audio className="self-center" controls>
              <source src={voice.audio} type="audio/mpeg" />
            </audio>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default VoicesPage;
