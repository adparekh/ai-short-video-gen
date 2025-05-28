import Replicate from "replicate";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/configs/Firebase";
import axios from "axios";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
      useFileOutput: false,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    const [output] = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      { input }
    );

    // Save to Firebase storage
    const base64Image =
      "data:image/png;base64," + (await ConvertImageToBase64(output));

    const fileName = "ai-short-video-files/" + Date.now() + ".png";
    const storageRef = ref(storage, fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ result: downloadURL });
  } catch (e) {
    return NextResponse.json({ error: e.message });
  }
}

const ConvertImageToBase64 = async (imageUrl) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(resp.data).toString("base64");
    return base64Image;
  } catch (e) {
    console.error("Error converting image to base64:", e);
  }
};
