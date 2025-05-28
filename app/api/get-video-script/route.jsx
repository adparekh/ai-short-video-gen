import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const result = await chatSession.sendMessage({
      message: prompt,
    });

    let rawText = result.text;

    // Remove code block formatting if present
    if (rawText.startsWith("```json")) {
      rawText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    return NextResponse.json({ result: JSON.parse(rawText) });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
