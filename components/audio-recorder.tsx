"use client"

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Dot } from 'lucide-react';


const AudioRecorder = () => {


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();


   if(!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>
   }
    
      const startListening = () => {
        SpeechRecognition.startListening();
      };

      
  return (
    <div className='w-full text-center '>
        <h1 className='font-bold text-2xl'>Record your own voice right now! Or upload an audio file.</h1>
      <p className='flex flex-row items-center'>Microphone: {listening ? <Dot className='text-red-500 animate-pulse' size={60} /> : "currently off"}</p>
      <div className=''>
    <button className='bg-gray-900 text-white p-3 rounded-xl mr-10' onClick={startListening} disabled={listening}>
        Start
      </button>
      <button className='bg-red-500 text-white p-3 rounded-xl mr-10' onClick={SpeechRecognition.stopListening} disabled={!listening}>
        Stop
      </button>
      <button className='bg-white text-black border p-3 rounded-xl mr-10' onClick={resetTranscript} disabled={!listening}>
        Reset
      </button>
      </div>
      <p>{transcript}</p>
      <button>
        Download Audio
      </button>
      
  
    </div>
  );
};

const AudioRecorderContainer = () => {
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;

  return <AudioRecorder />;
};

export default AudioRecorderContainer;
