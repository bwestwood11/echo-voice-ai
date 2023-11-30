"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { deleteAudio } from "@/app/_actions/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type AudioFile = {
  id: string;
  userId: string;
  aiName: string;
  fileName: string;
  url: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  // 
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

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteAudio({ audioId: id });

      setAudioFiles((prev) => prev.filter((audio) => audio.id !== id));
    } catch (error) {
      console.error("Error deleting audio file:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100">
      <h1 className="text-center font-extrabold tracking-wide text-4xl">Your Saved {" "}<span className="text-[#ff8303]">Audio</span>  Files</h1>
      <p className="text-center mt-3">All audio files will be saved here when you generate a new voice then click "Save to dashboard"</p>
      {audioFiles.length === 0 && (
        <p className="text-center">No audio files found.</p>
      )}
      {audioFiles.map((audio) => (
        <div className="grid lg:grid-cols-4 max-w-5xl mx-auto mt-5" key={audio.id}>
          <div className="flex flex-col items-center">
           
            <Image
              src={audio.image}
              alt={audio.fileName}
              width={140}
              height={140}
              className="hover:opacity-80 transition-opacity duration-300"
            /> 
            <p className="text-lg font-bold">{audio.aiName}</p>
            <audio controls>
              <source src={audio.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-red-500 hover:bg-red-500/70 p-3 rounded-full">
                  <BsTrash className='text-white' />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col">
                  <p className="text-gray-600">
                    Are you sure you want to delete this audio file?
                  </p>
                  <div className="flex gap-6 mt-6">
                    <button className="bg-green-500 hover:bg-green-500/70 text-white p-2 rounded-md" onClick={() => handleDelete(audio.id)}>Yes</button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;