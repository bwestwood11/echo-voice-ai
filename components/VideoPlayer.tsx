import React, { useRef } from 'react';

interface VideoPlayerProps {
  videoSrc: string;
}

const VideoPlayer = ({ videoSrc }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if the video source is an iframe
  const isIframe = videoSrc.startsWith('<iframe');

  return (
    <div>
      {isIframe ? (
        // Render iframe if video source is an iframe
        <div dangerouslySetInnerHTML={{ __html: videoSrc.replace('<iframe', '<iframe autoplay') }} />
      ) : (
        // Render video player if video source is a video file
        <video ref={videoRef} controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;