"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

type AudioFile = {
  id: string;
  userId: string;
  aiName: string;
  text: string;
  fileName: string;
  url: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const SavedVoices = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const response = await fetch("/api/audioFiles", {});
        if (!response.ok) {
          throw new Error("Failed to fetch audio files");
        }

        const data = await response.json();
        setAudioFiles(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchAudioFiles();
  }, []);

  return (
    <div>
      {audioFiles.length === 0 && <p className="mt-4">No audio files found</p>}
      <div className="flex flex-col mt-6">
        {audioFiles.map((audio) => (
          <div key={audio.id} className="flex flex-col">
          <div className="flex space-x-6 items-center">
            <Image
              src={audio.image}
              alt={audio.aiName}
              width={100}
              height={100}
            />
            <h2 className="">{audio.aiName}</h2>
            <p>{audio.text}</p>
            <audio controls src={audio.url} />
            </div>
            
            <Separator orientation="horizontal" className="my-1 w-full xl:w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedVoices;
