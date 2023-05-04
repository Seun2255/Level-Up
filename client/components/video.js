import React, { useEffect, useRef } from "react";
import styles from "@/styles/Components/video.module.css";
import { useMeetingMachine } from "@huddle01/react/hooks";

const Video = ({ track }) => {
  const { state } = useMeetingMachine();

  const getStream = (_track) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    return stream;
  };

  const videoRef = useRef(null);
  useEffect(() => {
    console.log({ consumers: state.context.consumers });
    const videoObj = videoRef.current;

    if (videoObj) {
      videoObj.srcObject = getStream(track);
      videoObj.onloadedmetadata = async () => {
        console.warn("videoCard() | Metadata loaded...");
        try {
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      videoObj.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, [state.context.consumers]);

  console.log({ consumers: state.context });

  return (
    <div className={styles.main}>
      <video ref={videoRef} autoPlay className={styles.video}></video>
    </div>
  );
};

export default Video;
