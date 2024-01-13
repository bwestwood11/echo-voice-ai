"use server";

import { auth } from "@/auth";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { database } from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL({
  name,
  correctImagePath,
  text
}: {
  name: string;
  correctImagePath: string;
  text: string
}) {
  // Get the user's session
  const session = await currentUser();
  if (!session) return { error: "Not authenticated" };
  console.log("testing out", name, correctImagePath);

  const timestamp = new Date().toISOString();
  const key = `users/${session.id}/audio/${timestamp}_audioFile.mp3`;

  const putObjctCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    // ServerSideEncryption: "AES256",
    Metadata: {
      userId: session.id,
      name: name,
      image: correctImagePath,
    },
  });

  const signedURL = await getSignedUrl(s3, putObjctCommand, {
    expiresIn: 3600,
  });

  console.log("signedURL", signedURL);

  const newAudio = await database.audioFile.create({
    data: {
      userId: session.id,
      url: signedURL.split("?")[0],
      fileName: `${timestamp}_audioFile.mp3`,
      image: correctImagePath,
      aiName: name,
      text: text
    },
  });

  console.log("newAudio", newAudio)

  return { success: { url: signedURL, audio: newAudio } };
}

export async function deleteAudio({ audioId }: { audioId: string }) {
  // Get the user's session
  console.log("testing out", audioId);
  const session = await currentUser();
  if (!session) return { error: "Not authenticated" };

  const audio = await database.audioFile.findUnique({
    where: { id: audioId },
  });

  console.log("audio", audio);

  if (!audio) return { error: "Audio file not found" };

  if (audio.userId !== session.id) {
    return { error: "You do not have permission to delete this audio file" };
  }

  // delete from s3
  const deleteObjctCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `users/${session.id}/audio/${audio.fileName}`,
  });

  await s3.send(deleteObjctCommand);

  await database.audioFile.delete({
    where: { id: audioId },
  });

  return { success: "Audio file deleted" };
}
