import React, { useEffect, useRef } from "react";
import styles from "@/styles/Components/video.module.css";
import { useMeetingMachine } from "@huddle01/react/hooks";

const Audio = ({ track }) => {
  const { state } = useMeetingMachine();

  const getStream = (_track) => {
    const stream = new MediaStream();
    stream.addTrack(_track);
    return stream;
  };

  const audioRef = useRef(null);
  useEffect(() => {
    console.log({ consumers: state.context.consumers });
    const audioObj = audioRef.current;

    if (audioObj) {
      audioObj.srcObject = getStream(track);
      audioObj.onloadedmetadata = async () => {
        console.warn("audioCard() | Metadata loaded...");
        try {
          await audioObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      audioObj.onerror = () => {
        console.error("audioCard() | Error is hapenning...");
      };
    }
  }, [state.context.consumers]);

  console.log({ consumers: state.context });

  return (
    <>
      <audio ref={audioRef} autoPlay></audio>
    </>
  );
};

export default Audio;
