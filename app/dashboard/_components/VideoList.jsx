import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [durationInFrames, setDurationInFrames] = useState(100);
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoID, setVideoID] = useState();

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-30">
      {videoList.map((video, index) => (
        <div
          key={index}
          className="hover:scale-105 transition-all cursor-pointer duration-200 ease-in-out"
          onClick={() => {
            setOpenPlayerDialog(true);
            setVideoID(video?.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={400}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrames: (frames) => console.log(frames),
            }}
          />
        </div>
      ))}
      <PlayerDialog
        playVideo={openPlayerDialog}
        setPlayVideo={setOpenPlayerDialog}
        videoID={videoID}
      />
    </div>
  );
}

export default VideoList;
