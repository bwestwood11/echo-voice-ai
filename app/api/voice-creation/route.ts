import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { blob } from "stream/consumers";
import { increaseApiLimit, checkApiLimit, checkProApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
   const body = await req.json();
   const { voiceID, text } = body;
   console.log(body);
   console.log(voiceID)

   const freeTrial = await checkApiLimit();
   const isPro = await checkSubscription();
   const proLimit = await checkProApiLimit();

    if(!freeTrial && !isPro) {
        return new NextResponse("Free trial has expired", { status: 403})
    };

    if(isPro && !proLimit) {
        return new NextResponse("Pro limit has been reached", { status: 401})
    }

   const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?optimize_streaming_latency=3`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'audio/mpeg',
            "xi-api-key": process.env.ELEVEN_LABS!,
        },
        body: JSON.stringify({
            text: text,
            voice_settings: {
                stability: 0.8,
            similarity_boost: 0.9
            }
   })

    }); 

    await increaseApiLimit();

    console.log(response.headers)
    // let buffer = await (await response.blob()).arrayBuffer();
    // buffer = Buffer.from(buffer);

    // const base64String = buffer.toString('base64');
    // const voice = `data:audio/mpeg;base64,${base64String}`;

    // console.log(voice)
    const blob = await response.blob();

    return new NextResponse(blob)
}