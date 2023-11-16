'use client'

import React, { useState } from 'react';
import { Inbox } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': ['.mp4', '.mkv', '.avi', '.webm'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const [firstFile] = acceptedFiles;
      if (firstFile.type.startsWith('video')) {
        console.log('Video File:', firstFile);
        setVideoFile(URL.createObjectURL(firstFile));
      }
    },
  });


  return (
    <div>
      <div className="p-2 bg-white rounded-xl w-1/4 mx-auto">
        <div
          {...getRootProps({
            className:
              'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
          })}
        >
          <input {...getInputProps()} />
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop Video File Here</p>
          </>
        </div>
      </div>
      {videoFile && (
        <div className='md:w-1/3 mx-auto mt-10'>
          <video controls className='rounded-lg shadow-2xl'>
            <source src={videoFile} type="video/mp4" />
          </video>
        </div>
      )}
   
    </div>
  );
};

export default FileUpload;
