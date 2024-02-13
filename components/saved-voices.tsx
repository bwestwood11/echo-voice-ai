import Image from "next/image";
import { Separator } from "./ui/separator";

const SavedVoices = ({
  audioFiles,
  query,
}: {
  audioFiles: Array<any> | false;
  query: string;
}) => {
  const filteredAudioFiles = Array.isArray(audioFiles)
    ? audioFiles.filter((audio) => {
        return audio.text.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <div>
      {filteredAudioFiles.length === 0 && (
        <p className="mt-4">No audio files found</p>
      )}
      <div className="flex flex-col mt-6">
        {filteredAudioFiles.map((audio) => (
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
  );
};

export default SavedVoices;
