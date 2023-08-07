"use client";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
  const [voice, setVoice] = useState("");
  const [response, setResponse] = useState("");
  console.log("params", params);
  // const voice = await cloneVoice({ params });
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

    setResponse(await response.blob());
    } catch (error) {
      console.log(error)
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
      <div className="flex flex-col">
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
          <Button onClick={handleVoiceInput}>Generate</Button>
        </div>
      </div>

      <audio src={response ? URL.createObjectURL(response) : ''} controls />
        {/* <source ref={sourceElem} src={response} type="audio/mpeg" /> */}
    </div>
  );
}
