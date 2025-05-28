import React, { useEffect, useMemo } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  imageList,
  audioFileURL,
  captions,
  setDurationInFrames,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const duration = useMemo(() => {
    if (!captions || captions.length === 0) return 0;
    return (captions[captions.length - 1]?.end / 1000) * fps;
  }, [captions, fps]);

  useEffect(() => {
    if (duration > 0) {
      setDurationInFrames(duration);
    }
  }, [duration, setDurationInFrames]);

  const getCurrentCaption = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions.find(
      (word) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : "";
  };

  return (
    script && (
      <AbsoluteFill className="bg-black">
        {imageList?.map((image, index) => {
          const startTime = (index * duration) / imageList?.length;
          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
          return (
            <Sequence key={index} from={startTime} durationInFrames={duration}>
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(index)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h2 className="text-xl">{getCurrentCaption()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          );
        })}
        <Audio src={audioFileURL} />
      </AbsoluteFill>
    )
  );
}

export default RemotionVideo;
