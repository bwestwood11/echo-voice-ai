"use client";

import { montserrat } from "@/app/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdPlay } from "react-icons/io";
import { Button } from "../ui/button";

const examples = [
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video:
      '<iframe title="vimeo-player" src="https://player.vimeo.com/video/890725328?badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479" width="540" height="360"></iframe>',
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video: "/warehouse.mp4",
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video: "/warehouse.mp4",
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video: "/warehouse.mp4",
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video: "/warehouse.mp4",
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
  {
    title: "Advertisements",
    thumbnail: "/warehouse-thumbnail.png",
    video: "/warehouse.mp4",
    avatar: '/appliance-plug-logo.png',
    owner: "The Appliance Plug",
  },
];

const UseCases = () => {
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    thumbnail: string;
    video: string;
  }>(null);
  return (
    <div className="w-full h-full mt-40 relative">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h3 className={cn(montserrat.className, "mb-6 font-extrabold text-4xl uppercase")}>
          Real World <span className="text-[#ff8303]">Examples</span> of AI
          Voices
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16 mt-16 px-10">
          {examples.map((example, index) => (
            <div
              key={index}
              className="flex flex-col relative items-center justify-center"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative">
                    <Image
                      src={example.thumbnail}
                      alt="thumbnail"
                      width="840"
                      height="560"
                      className="rounded-lg hover:opacity-80 cursor-pointer"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setSelectedVideo(example)}
                    >
                      <IoMdPlay size={60} color="#fff" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-screen-sm w-screen bg-transparent">
                  <div className="mt-6 w-full" dangerouslySetInnerHTML={{ __html: example.video }} />
                </DialogContent>
              </Dialog>
              <div className="flex w-full justify-between mt-4">
                <h4 className="text-md font-semibold">{example.title}</h4>
                <Button variant="orange">Learn More</Button>
              </div>
              <div className="flex gap-3 w-full">
                <Image
                  src={example.avatar ?? example.thumbnail}
                  alt="user"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
                <p className="text-md font-semibold">{example.owner}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
