import { currentUser } from "@/lib/auth";
import { database } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await currentUser()

  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const audioFiles = await database.audioFile.findMany({
      where: {
        userId: session.id,
      },
    });

    return NextResponse.json(audioFiles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
