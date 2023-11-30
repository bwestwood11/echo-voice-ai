'use client'

// components/VideoProcessor.js
import { useState, useEffect, ReactEventHandler } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import WaveSurfer from "wavesurfer.js";
import ReactPlayer from "react-player";
import VideoThumbnail from "react-video-thumbnail";

const VideoProcessor = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [thumbnails, setThumbnails] = useState<
    { time: number; thumbnail: any }[]
  >([]);
  const [duration, setDuration] = useState<number | null>(null); // New state for video duration

  let wavesurfer: WaveSurfer | null = null;

useEffect(() => {
  if (videoFile) {
    generateThumbnails();

    // Cleanup the WaveSurfer instance when the component unmounts
    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
      }
    };
  }
}, [videoFile]);

  const onDrop = (acceptedFiles: File[]) => {
    setVideoFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".mkv", ".avi", ".webm"] },
  });

  const handleProcessVideo = async () => {
    if (!videoFile) {
      console.error("No video file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "backend-api-url/process-video",
        formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Add this header
          },
        }
      );

      // Access the processed video and audio data
      const { videoPath, audioData } = response.data;

      // Display the video using React Player
      // For audio, use Wavesurfer.js or another audio visualization library
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "violet",
        progressColor: "purple",
      });

      wavesurfer.loadBlob(
        new Blob([
          new Uint8Array(
            atob(audioData)
              .split("")
              .map((c) => c.charCodeAt(0))
          ),
        ])
      );

      // You may also want to control the playback of video
      // For simplicity, let's assume the video is processed at the same path as the original video
      setCurrentTime(0);
    } catch (error) {
      console.error("Error:", error);
      // Handle error, maybe show an error message
    }
  };

  // Callback to set the duration when ReactPlayer gets it
  const handleVideoDuration = (videoDuration: number) => {
    setDuration(videoDuration);
  };

  const handleVideoProgress = (e: any) => {
    setCurrentTime(e.playedSeconds);
  };

  const generateThumbnails = async () => {
    if (!videoFile || duration === null) {
      console.error("No video file selected or duration not available.");
      return;
    }

    const thumbnailCount = Math.floor(duration);
    const thumbnailsArray: { time: number; thumbnail: any }[] = [];

    for (let i = 0; i < thumbnailCount; i++) {
      const time = i;
      const thumbnail = await VideoThumbnail.thumbnail(videoFile, { time });
      thumbnailsArray.push({ time, thumbnail });
    }

    setThumbnails(thumbnailsArray);
  };

  return (
    <div>
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the video file here...</p>
      ) : (
        <p>Drag 'n' drop a video file here, or click to select one</p>
      )}
    </div>
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleProcessVideo}>Process Video</button>
    </div>
    <div style={{ marginTop: "20px" }}>
      <ReactPlayer
        url={videoFile ? URL.createObjectURL(videoFile) : undefined}
        controls
        width="100%"
        height="auto"
        onProgress={handleVideoProgress}
        onDuration={handleVideoDuration}
      />
    </div>
    <div id="waveform" style={{ marginTop: "20px" }}></div>
    <Timeline currentTime={currentTime} thumbnails={thumbnails} />
  </div>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const Timeline = ({ currentTime, thumbnails }: any) => {
  // You can customize the timeline component based on your needs
  // This is a simple example with time marks and thumbnails
  return (
    <div style={{ marginTop: "20px" }}>
      <p>Timeline</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "lightgray",
            position: "relative",
          }}
        >
          {thumbnails.map((thumbnail: any, index: any) => (
            <div
              key={index}
              style={{
                height: "100%",
                width: "1px",
                backgroundColor: "blue",
                position: "absolute",
                left: `${(thumbnail.time / 10) * 100}%`, // Adjust the factor based on your video duration
              }}
            ></div>
          ))}
          <div
            style={{
              height: "100%",
              width: `${(currentTime / 10) * 100}%`, // Adjust the factor based on your video duration
              backgroundColor: "red",
              position: "absolute",
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        {thumbnails.map((thumbnail: any, index: any) => (
          <img
            key={index}
            src={thumbnail.thumbnail}
            alt={`Thumbnail at ${thumbnail.time} seconds`}
            style={{ width: "40px", height: "40px", borderRadius: "4px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoProcessor;
