declare module 'react-video-thumbnail' {
    const thumbnail: (video: File, options?: { time: number }) => Promise<string>;
  
    export { thumbnail };
  }