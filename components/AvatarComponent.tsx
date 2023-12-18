'use client'

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

 
  type Voice = {
    name: string;
    voiceID: string;
    accent: string;
    image: string;
    audio: string;
    flag: string;
  };

  // Add a type for the props
type AvatarComponentProps = {
    voices: Voice[];
    setSelectedVoiceID: (voiceID: string) => void;
    selectedVoiceID: string;
  };



const AvatarComponent = ({ voices, setSelectedVoiceID, selectedVoiceID }: AvatarComponentProps) => {
    

  useEffect(() => {
    if (selectedVoiceID) {
      const selectedVoice = voices.find(voice => voice.voiceID === selectedVoiceID);
      console.log('Selected voice:', selectedVoice);
      console.log('Selected voiceID:', selectedVoiceID);
    }
  }, [selectedVoiceID]);

  return (
    <div>
    <Select value={selectedVoiceID} onValueChange={setSelectedVoiceID}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a voice" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Voices</SelectLabel>
          {voices.map((voice) => (
            <SelectItem
            key={voice.voiceID} 
            value={voice.voiceID}>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <Image src={voice.image} alt={voice.name} width={30} height={30} />
                </div>
                <p className="text-lg">{voice.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  )
}

export default AvatarComponent;