// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";

// const cloneVoice = async ({ params }: { params: { id: string } }) => {
//   const voiceID = params.id;
//   const session = await getServerSession(authOptions);
//   console.log(voiceID);

//   const response = await fetch(
//     `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?optimize_streaming_latency=3`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         accept: "audio/mpeg",
//         "xi-api-key": process.env.ELEVEN_LABS as string,
//       },
//       body: JSON.stringify({
//         text: `Hi ${session?.user.name}, I'm an AI voice clone to help aide you in your social media content, podcasts, audio books, and much more.`,
//         voice_settings: {
//           stability: 0.8,
//           similarity_boost: 0.9,
//         },
//       }),
//     }
//   );

//   let buffer = await (await response.blob()).arrayBuffer();
//   buffer = Buffer.from(buffer);

//   const base64String = buffer.toString("base64");
//   const voice = `data:audio/mpeg;base64,${base64String}`;
//   console.log(voice)
//   return voice;
// };

// export default async function YourVoicesPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   console.log("params", params);
//   const voice = await cloneVoice({ params });

//   return (
//     <div>
//       <h1 className="mt-20">Home</h1>
//       <audio controls>
//         <source src={voice} type="audio/mpeg" />
//       </audio>
//     </div>
//   );
// }

const cloneVoice = async ({params}: {params: {id: string}}) => {
 
  // const posOf3D = read.indexOf('3D')
  // const voiceID = read.slice(posOf3D +2)
  const voiceID = params.id
  // console.log(voiceID)
 
  // console.log(read)
  // console.log(read.split('?')[0].replaceAll('%20', " "))
   const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?optimize_streaming_latency=3`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg',
        "xi-api-key": process.env.ELEVEN_LABS as string,
      },
      body: JSON.stringify({
        text:"Hi there",
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
  // console.log(voice)
  return voice;


}


export default async function Read({params}: {params: {id: string}}) {
// console.log("params", params)
// const read = params.read;
// console.log("message", read)
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