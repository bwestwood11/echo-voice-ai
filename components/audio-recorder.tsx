"use client"

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AudioRecorder = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startListening}>
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>
        Stop
      </button>
      <button onClick={resetTranscript}>
        Reset
      </button>
      <p>{transcript}</p>
      <button onClick={() => {}}>Download the audio</button>
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
