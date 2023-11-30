"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prismadb from "@/lib/prismadb";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL({
  name,
  correctImagePath,
}: {
  name: string;
  correctImagePath: string;
}) {
  // Get the user's session
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Not authenticated" };
  console.log("testing out", name, correctImagePath);

  const timestamp = new Date().toISOString();
  const key = `users/${session.user.id}/audio/${timestamp}_audioFile.mp3`;

  const putObjctCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Metadata: {
      userId: session.user.id,
      name: name,
      image: correctImagePath,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjctCommand, {
    expiresIn: 60,
  });

  const newAudio = await prismadb.audioFile.create({
    data: {
      userId: session.user.id,
      url: signedURL.split("?")[0],
      fileName: `${timestamp}_audioFile.mp3`,
      image: correctImagePath,
      aiName: name,
    },
  });

  return { success: { url: signedURL, audio: newAudio } };
}

export async function deleteAudio({ audioId }: { audioId: string }) {
  // Get the user's session
  console.log("testing out", audioId);
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Not authenticated" };

  const audio = await prismadb.audioFile.findUnique({
    where: { id: audioId },
  });

  console.log("audio", audio);

  if (!audio) return { error: "Audio file not found" };

  if (audio.userId !== session.user.id) {
    return { error: "You do not have permission to delete this audio file" };
  }

  // delete from s3
  const deleteObjctCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `users/${session.user.id}/audio/${audio.fileName}`,
  });

  await s3.send(deleteObjctCommand);

  await prismadb.audioFile.delete({
    where: { id: audioId },
  });

  return { success: "Audio file deleted" };
}
