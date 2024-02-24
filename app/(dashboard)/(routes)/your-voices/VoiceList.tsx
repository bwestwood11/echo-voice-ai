import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import { getAudioFiles } from '@/lib/api-limit'

const VoiceList = async ({ query }:{query: string}) => {
    const audioFiles = await getAudioFiles();

    const filteredAudioFiles = Array.isArray(audioFiles) ? audioFiles.filter((audio) => {
        return audio.aiName.toLowerCase().includes(query.toLowerCase());
    }) : [];

  return (
    <div>
    {Array.isArray(audioFiles) && audioFiles.length === 0 && (
        <p className="mt-4">No audio files found</p>
    )}
    <div className="flex flex-col mt-6">
    {Array.isArray(audioFiles) && filteredAudioFiles.map((audio) => (
        <div key={audio.id} className="flex flex-col">
          <div className="flex space-x-6 items-center">
            <Image
              src={audio.image}
              alt={audio.aiName}
              width={100}
              height={100}
            />
            <h2 className="">{audio.aiName}</h2>
            <p>{audio.text}</p>
            <audio controls src={audio.url} />
          </div>

          <Separator
            orientation="horizontal"
            className="my-1 w-full xl:w-1/3"
          />
        </div>
      ))}
    </div>
  </div>
  )
}

export default VoiceList