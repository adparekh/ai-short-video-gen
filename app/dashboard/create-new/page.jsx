"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { Users, VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { eq } from "drizzle-orm";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoID, setVideoID] = useState(0);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onHandleCreateVideo = () => {
    if (userDetails?.credits <= 0) {
      toast.error("You don't have enough credits");
      return;
    }
    GetVideoScript();
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate a " +
      formData.duration +
      " video on the following topic : " +
      formData.topic +
      " along with an AI image prompt in a " +
      formData.style +
      " style for each scene and give me the result in a JSON format with imagePrompt and ContentText as field, No Plain text";
    console.log("Prompt: ", prompt);
    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      console.log("Video Script Generated");
      await GenerateAudio(resp.data.result);
    } else {
      toast.error("Server Side Error; Refresh and try again");
    }
    // setLoading(false);
  };

  const GenerateAudio = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    videoScriptData.forEach((frame) => (script += frame.ContentText + " "));
    const id = uuidv4();

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setVideoData((prev) => ({
      ...prev,
      audioFileURL: resp.data.result,
    }));
    console.log("Audio Generated");
    resp.data.result &&
      (await GenerateCaptions(resp.data.result, videoScriptData));
  };

  const GenerateCaptions = async (audioURL, videoScriptData) => {
    setLoading(true);
    const resp = await axios.post("/api/generate-captions", {
      audioURL: audioURL,
    });
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    console.log("Captions Generated");
    resp.data.result && (await GenerateImages(videoScriptData));
  };

  const GenerateImages = async (videoScriptData) => {
    try {
      const images = await Promise.all(
        videoScriptData.map(async (frame) => {
          const resp = await axios.post("/api/generate-image", {
            prompt: frame.imagePrompt,
          });
          return resp.data.result;
        })
      );
      setVideoData((prev) => ({
        ...prev,
        imageList: images,
      }));
    } catch (error) {
      console.log("Error generating images: ", error);
    }
    console.log("Images Generated");
    setLoading(false);
  };

  useEffect(() => {
    console.log("Video Data: ", videoData);
    if (videoData && Object.keys(videoData).length == 4) {
      saveVideoData(videoData);
      // console.log("You should really not be here");
    }
  }, [videoData]);

  const saveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileURL: videoData?.audioFileURL,
        captions: videoData?.captions,
        imageList: videoData?.imageList,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    await UpdateUserCredits();
    setVideoID(result[0].id);
    setVideoData({});
    setPlayVideo(true);
    console.log("Video Data Saved: ", result);
    setLoading(false);
  };

  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetails?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));
    setUserDetails((prev) => ({
      ...prev,
      credits: userDetails?.credits - 10,
    }));
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New Video
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration  */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create Button */}
        <Button className="mt-10 w-full" onClick={onHandleCreateVideo}>
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} />
      <PlayerDialog
        playVideo={playVideo}
        setPlayVideo={setPlayVideo}
        videoID={videoID}
      />
    </div>
  );
}

export default CreateNew;
