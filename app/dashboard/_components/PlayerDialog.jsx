import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, setPlayVideo, videoID }) {
  const [videoData, setVideoData] = useState();
  const [durationInFrames, setDurationInFrames] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo && videoID) {
      GetVideoData();
    }
  }, [playVideo, videoID]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoID));
    setVideoData(result[0]);
    console.log("Video Data: ", result);
  };

  return (
    <Dialog open={playVideo} onOpenChange={(open) => setPlayVideo(open)}>
      <DialogContent className="bg-white flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5 text-center">
            Your short video is ready
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm text-center mt-2">
            Watch the preview below and export if satisfied.
          </DialogDescription>
        </DialogHeader>

        {videoData && (
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrames.toFixed(0)) + 30}
            compositionWidth={300}
            compositionHeight={450}
            controls={true}
            fps={30}
            inputProps={{
              ...videoData,
              setDurationInFrames: (frames) => setDurationInFrames(frames),
            }}
          />
        )}

        <div className="flex gap-10 justify-center mt-10">
          <Button
            variant="ghost"
            onClick={() => {
              setPlayVideo(false); // Close the dialog
              router.replace("/dashboard"); // Optional: Redirect
            }}
          >
            Exit
          </Button>
          <Button>Export</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
