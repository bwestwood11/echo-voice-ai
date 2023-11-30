import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { blob } from "stream/consumers";
import { increaseApiLimit, checkApiLimit, checkProApiLimit, increaseCharacterCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
   const body = await req.json();
   const { voiceID, text, characterCount } = body;
   console.log(body);
   console.log(voiceID)
   console.log('characterCount', characterCount)

   const freeTrial = await checkApiLimit();
   const isPro = await checkSubscription();
   const proLimit = await checkProApiLimit();

    // free trial expired and not pro then return 403    
    if(!freeTrial && !isPro) {
        return new NextResponse("Free trial has expired", { status: 403})
    };
    
    // pro limit reached then return 401
    if(isPro && !proLimit) {
        return new NextResponse("Pro limit has been reached", { status: 401})
    }

    // make an API request to eleven labs for the voice audio
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
            similarity_boost: 0.9,
            }
   })

    }); 

    //  increase the api limit or counter if pro
    await increaseApiLimit();
    await increaseCharacterCount(characterCount); 

    console.log(response.headers)
    const blob = await response.blob();

    return new NextResponse(blob)
}