

  const cloneVoice = async ({params}: {params: {read: string}}) => {
    const read = params.read 
    const posOf3D = read.indexOf('3D')
    const voiceID = read.slice(posOf3D +2)
    console.log(voiceID)
   
    console.log(read)
    console.log(read.split('?')[0].replaceAll('%20', " "))
     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?optimize_streaming_latency=3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'audio/mpeg',
          "xi-api-key": process.env.ELEVEN_LABS as string,
        },
        body: JSON.stringify({
          text: read.split('%26')[0].replaceAll('%20', " "),
          voice_settings: {
            stability: 0.8,
            similarity_boost: 0.9
          }
     })
    })

    // Emily LcfcDJNUP1GQjkzn1xUU
    // GBv7mTt0atIp3Br8iCZE
    let buffer = await (await response.blob()).arrayBuffer();
    buffer = Buffer.from(buffer);

    const base64String = buffer.toString('base64');
    const voice = `data:audio/mpeg;base64,${base64String}`;
    console.log(voice)
    return voice;


  }


export default async function Read({params}: {params: {read: string}}) {
  console.log("params", params)
  const read = params.read;
  console.log("message", read)
 const voice = await cloneVoice({params});
//  console.log("voice", voice)

  return (
 
   <div>
      <h1 className="mt-20">Home</h1>
       <audio controls>
        <source src={voice} type="audio/mpeg" />
      </audio>
     
   </div>
  )
}
