"use client"

import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null) ;
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-container">
      <audio ref={audioRef} src={src} />
      <div className="audio-player">
        <button className='rounded-full border-2 border-black p-3 hover:bg-white/30 cursor-pointer' onClick={handlePlayPause}>
          <Play className='fill-black ' />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;