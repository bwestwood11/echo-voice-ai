'use client'

import NavigationBar from "./Home-Navbar";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const Hero = () => {
  const [activeAudio, setActiveAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = (audioSrc: string) => {
    if (activeAudio) {
      activeAudio.pause();
    }

    const audio = new Audio(audioSrc);
    audio.play();
    setActiveAudio(audio);
  };

  const { data: session } = useSession();


  return (
    <div>
      <NavigationBar />
      <div className="w-full lg:mt-32 mt-20 h-full relative isolate" style={{pointerEvents:'none'}}>
      <div
          className="absolute inset-x-0 md:-top-40 bottom-40 sm:bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative -z-10 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffa256] to-[#e08700] opacity-50 sm:left-[calc(90%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex lg:flex-row gap-16 lg:gap-4 flex-col max-w-7xl mx-auto px-6" style={{pointerEvents: 'all'}}>
          <div className={cn(montserrat.className, "basis-1/2 lg:px-4 md:px-16")}>
            <h1 className="font-semibold mb-2">
              Text to Speech Voice Generator
            </h1>
            <h2 className="font-extrabold text-5xl tracking-wide">
              Realistic AI <span className="text-[#ff8303]">Voices</span>{" "}
              Generated in Seconds
            </h2>
            <p className="mt-6 text-gray-600 leading-7">
              Create natural sounding voiceovers for your videos, podcasts, and more. Choose from over 50 different voices and languages to find the perfect one for you. 
            </p>
           {!session ? (
            <Button variant="orange" size="lg" className="mt-6">
              Get Started
            </Button>
           ) : (
              <Button variant='orange' size='lg' className="mt-6">
                Dashboard
              </Button>
           )}
          </div>
          <div className="basis-1/2 px-8 justify-center flex flex-row gap-8 align-middle items-center">
            <Image
              src="/Glinda-Image.png"
              alt="Hero Image"
              width={200}
              height={200}
              className="rounded-xl cursor-pointer shadow-xl w-1/2 sm:w-full shadow-black hover:scale-105 transition-all duration-300"
              onClick={() => playAudio("/Glinda-Voice.mp3")}
            />
            <Image
              src="/Clyde-Image.png"
              alt="Hero Image"
              width={200}
              height={200}
              className="rounded-xl cursor-pointer shadow-xl w-1/2 sm:w-full shadow-black hover:scale-105 transition-all duration-300"
              onClick={() => playAudio("/Clyde-Voice.mp3")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
