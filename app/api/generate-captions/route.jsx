import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioURL } = await req.json();
    const client = new AssemblyAI({
      apiKey: process.env.CAPTIONS_API_KEY,
    });

    const audioFile = audioURL;
    const params = {
      audio: audioFile,
      speech_model: "universal",
    };

    const transcript = await client.transcripts.transcribe(params);
    return NextResponse.json({ 'result': transcript.words });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
