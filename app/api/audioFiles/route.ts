import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"



export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if(!session) return {error: "Not authenticated"}

    const audioFiles = await prismadb.audioFile.findMany({
        where: {
            userId: session.user.id
        }
    })

    return NextResponse.json(audioFiles)
}