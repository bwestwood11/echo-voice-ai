"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";
import { blob } from "stream/consumers";
import { Download } from "lucide-react";
import Link from "next/link";

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


  console.log("params", params);
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

  const handleVoiceInput = async () => {
    try {
      const response = await fetch("/api/voice-creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voiceID: voiceID,
          text: voice,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
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
      router.refresh();
    }
  };

  console.log("voiceID", voiceID);
  return (
    <div className="text-center flex flex-col items-center w-full">
      <h1
        className={cn("mt-10 font-bold text-4xl mb-10", montserrat.className)}
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
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            placeholder="Type your text here..."
          />
          <p className={voice.length > 200 ? "text-red-500" : ""}>
            Character Count: {voice.length}/200
          </p>
          <Button disabled={voice.length > 200} onClick={handleVoiceInput}>
            Generate
          </Button>
        </div>
      </div>

      <audio src={response ? URL.createObjectURL(response) : ""} controls />
      {/* <source ref={sourceElem} src={response} type="audio/mpeg" /> */}
      <a className="flex items-center gap-4 mt-10" href={response ? URL.createObjectURL(response) : ""} download>
       {response ? (<><Download size={32} />  <p>Download Audio File</p></>): "" } 
      </a>
      <Link href={{
        pathname: "/dashboard",
        query: { voice: response ? URL.createObjectURL(response) : ""}
      }} >Add to Your Dashboard</Link>
    </div>
  );
}
