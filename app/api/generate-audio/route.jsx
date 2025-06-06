import { NextResponse } from "next/server";
import fs from "fs";
import util from "util";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/Firebase";
import axios from "axios";

const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");

  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "MALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response?.audioContent, "binary");

  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

  const downloadURL = await getDownloadURL(storageRef);

  return NextResponse.json({ result: downloadURL });
}
