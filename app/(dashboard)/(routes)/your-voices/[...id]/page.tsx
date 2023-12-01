"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import { Download } from "lucide-react";
import { ImSpinner3 } from "react-icons/im";
import { getSignedURL } from "@/app/_actions/actions";
import { MAX_CHARACTERS } from "@/constants";
import { toast } from "react-hot-toast";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export default function YourVoicesPage({
  params,
}: {
  params: { id: string; image: string; name: string; flag: string };
}) {
  const sourceElem = useRef(null);
  const router = useRouter();
  const proModal = useProModal();
  const [voice, setVoice] = useState("");
  const [response, setResponse] = useState<Blob | "">("");
  const [converting, setConverting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // console.log("params", params);
  // using the params to get the correct name, image and flag
  const nameString = params.id[1].split("%26")[1];
  const name = nameString.split("%3D")[1];
  const imageString = params.id[1].split("%26")[0];
  const correctImagePath = imageString.startsWith("/")
    ? imageString
    : `/${imageString}`;
  console.log("image", correctImagePath);
  const flagString = params.id[2];
  const correctFlagPath = flagString.startsWith("/")
    ? flagString
    : `/${flagString}`;

  console.log("flag", correctFlagPath);

  // using the params to get the correct voiceID
  const voiceIDString = params.id[0];
  const voiceID = voiceIDString.replace("%26image%3D", "");

  const handleTextChange = (e: any) => {
    const newText = e.target.value;
    setCharacterCount(newText.length);
    setVoice(newText); // Update the state with the new text
  };

  const isGenerateDisabled = characterCount > MAX_CHARACTERS;

  // Upload and save Audio to S3 bucket & database
  const handleAudioUploadtoS3 = async (audioBlob: Blob) => {
    console.log("audioBlob", audioBlob);

    const signedURLResult = await getSignedURL({ name, correctImagePath, text:voice });
    console.log("signedURL", signedURLResult);
    if (!signedURLResult.success) {
      console.log("error", signedURLResult.error);
      return;
    }
    const url = signedURLResult.success.url;
    console.log("url", url);

    const response = await fetch(url, {
      method: "PUT",
      body: audioBlob,
      headers: {
        "Content-Type": "audio/mpeg",
        // "x-amz-content-sha-256": "UNSIGNED-PAYLOAD",
      },
    });

    if(!response.ok) {
      console.log("error", response);
      return;
    }
    
    if(response.ok) {
       toast.success("Audio file saved to your dashboard");
    }

    console.log("response", response);

  };

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
          voiceID: voiceID,
          text: voice,
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

  // console.log("voiceID", voiceID);
  return (
    <div className="flex w-full h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col">
        <h1
          className={cn(
            "mt-10 font-bold text-center text-4xl mb-10",
            montserrat.className
          )}
        >
          Your Voices
        </h1>
        <div className="flex flex-col mb-8">
          <Image src={correctImagePath} alt="name" width={250} height={250} />
          <div className="flex flex-row gap-2 mx-auto mb-6 items-center">
            <h3 className="font-semibold text-2xl">{name}</h3>
            <Image src={correctFlagPath} alt="flag" width={50} height={50} />
          </div>
          <div className="flex flex-col gap-4">
            <Textarea
              className=""
              value={voice}
              onChange={handleTextChange}
              placeholder="Type your text here..."
            />
            <p className={voice.length > 200 ? "text-red-500" : ""}>
              {/* Character Count: {voice.length}/200 */}
              Character Count: {characterCount}
            </p>
            <Button disabled={isGenerateDisabled} onClick={handleVoiceInput}>
              Generate
              {converting && (
                <span className="animate-spin text-lg ml-3">
                  <ImSpinner3 />
                </span>
              )}
            </Button>
          </div>
        </div>
        {response && (
          <>
            <audio
              src={response ? URL.createObjectURL(response) : ""}
              controls
            />
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
            <Button variant={'outline'}
              onClick={() => handleAudioUploadtoS3(response)}
            >
              Save to Your Dashboard
            </Button>
            </div>
         
           
          </>
        )}
      </div>
    </div>
  );
}
