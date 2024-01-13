"use client";

import { Montserrat } from "next/font/google";
import { useState } from "react";
import AvatarComponent from "@/components/AvatarComponent";
import InputText from "@/components/InputText";
import { Button } from "@/components/ui/button";
import { ImSpinner3 } from "react-icons/im";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { Download } from "lucide-react";
import { getSignedURL } from "@/actions/actions";

const montserrat = Montserrat({
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Upload a file to be processed!",
//   alternates: {
//     canonical: "https://www.voicefusion.io/dashboard",
//   },
// };

type Voice = {
  name: string;
  voiceID: string;
  accent: string;
  image: string;
  audio: string;
  flag: string;
};

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

const DashboardPage = () => {
  const [selectedVoiceID, setSelectedVoiceID] = useState("");
  const [text, setText] = useState("");
  const [converting, setConverting] = useState(false);
  const [response, setResponse] = useState<Blob | "">("");
  const [characterCount, setCharacterCount] = useState(0);

  const router = useRouter();
  const proModal = useProModal();

  // Create the audio from the user's input text
  const handleVoiceInput = async () => {
    try {
      setConverting(true);
      const response = await fetch("/api/voice-creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voiceID: selectedVoiceID,
          text: text,
          characterCount: characterCount,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          setConverting(false);
          proModal.onOpen();
        } else {
          console.log("Unexpected response status:", response.status);
        }
        return; // Stop further processing
      }

      const blobResponse = await response.blob();
      setResponse(blobResponse);
    } catch (error: any) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      setConverting(false);
      router.refresh();
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100">
      <h4 className="h2-bold text-center">
        Choose Your <span className="text-[#ff8303]">AI Character</span>
      </h4>
      <div className="max-w-7xl mx-auto mt-20">
        <div className="lg:grid lg:grid-rows-[20px_500px_1fr] lg:grid-cols-[200px_1fr_100px] lg:px-20 px-10 flex flex-col gap-2">
          <div className="row-span-2 flex flex-col">
            <AvatarComponent
              voices={voices}
              setSelectedVoiceID={setSelectedVoiceID}
              selectedVoiceID={selectedVoiceID}
            />
          </div>
          <div className="row-span-2 flex flex-col">
            <InputText
              setText={setText}
              text={text}
              characterCount={characterCount}
              setCharacterCount={setCharacterCount}
            />
          </div>
          <div className="row-span-2 flex flex-col">
            <Button onClick={handleVoiceInput} size="lg">
              Generate
              {converting && (
                <span className="animate-spin text-lg ml-3">
                  <ImSpinner3 />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      {response && (
        <>
          <audio src={response ? URL.createObjectURL(response) : ""} controls />
          {/* <source ref={sourceElem} src={response} type="audio/mpeg" /> */}
          <div className="flex flex-row gap-6 items-center mt-10">
            <a
              className="flex items-center gap-4"
              href={response ? URL.createObjectURL(response) : ""}
              download
            >
              {response ? (
                <div className="flex gap-6 items-center">
                  <Button className="flex gap-5">
                    <Download size={16} className="text-white" />{" "}
                    <p className="text-white">Download Audio File</p>
                  </Button>
                </div>
              ) : (
                ""
              )}
            </a>
            {/* <Button variant={'outline'}
              onClick={() => handleAudioUploadtoS3(response)}
            >
              Save to Your Dashboard
              {loading && (
                <span className="animate-spin text-lg ml-3">
                  <ImSpinner3 />
                </span>)}
            </Button> */}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
