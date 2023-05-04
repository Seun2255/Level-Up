import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/room.module.css";
import icons from "@/assets/icons/icons";
import { useEffect, useRef, useState } from "react";
import { useHuddle01, useEventListener } from "@huddle01/react";
import {
  useLobby,
  useVideo,
  useAudio,
  useRoom,
  usePeers,
  useMeetingMachine,
} from "@huddle01/react/hooks";
import { useRouter } from "next/router";
import Video from "@/components/video";
import Audio from "@/components/audio";
import { ThreeDots } from "react-loader-spinner";
import { getRoomDetails } from "../api/huddle";
import { useAccount } from "wagmi";
import { getQuestions } from "../api/database";

function Room({ questions }) {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const { initialize } = useHuddle01();
  const { joinLobby, leaveLobby, isLobbyJoined } = useLobby();
  const { address } = useAccount();
  const {
    fetchAudioStream,
    stopAudioStream,
    stream: micStream,
    produceAudio,
    stopProducingAudio,
    isProducing,
  } = useAudio();

  const {
    fetchVideoStream,
    stopVideoStream,
    stream: camStream,
    produceVideo,
    stopProducingVideo,
  } = useVideo();

  const { joinRoom, isRoomJoined } = useRoom();
  const [cam, setCam] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [loader, setLoader] = useState(false);
  const { peerIds, peers } = usePeers();
  const [content, setContent] = useState(1);
  const [roomJoined, setRoomJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);
  }, []);

  const videoRef = useRef(null);

  const { state, send } = useMeetingMachine();
  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;

    setVideo(true);
  });

  useEventListener("lobby:mic-on", () => {
    setAudio(true);
  });

  useEventListener("lobby:joined", () => {
    setLoader(false);
    getRoomDetails(id).then((data) => {
      if (data.hostWalletAddress[0] === address) setIsHost(true);
    });
  });

  const toggleVideo = () => {
    function onVideo() {
      produceVideo(camStream);
      setVideo(true);
    }

    function offVideo() {
      stopProducingVideo();
      setVideo(false);
    }

    roomJoined
      ? video
        ? offVideo()
        : onVideo()
      : video
      ? stopVideoStream()
      : fetchVideoStream();
  };

  const toggleAudio = () => {
    function onAudio() {
      produceAudio(camStream);
      setAudio(true);
    }

    function offAudio() {
      stopProducingAudio();
      setAudio(false);
    }

    roomJoined
      ? audio
        ? offAudio()
        : onAudio()
      : audio
      ? stopAudioStream()
      : fetchAudioStream();
  };

  useEventListener("room:joined", () => {
    setLoader(false);
    setRoomJoined(true);
    setVideo(false);
    setAudio(false);
  });

  const handleJoinLobby = async () => {
    setLoader(true);
    joinLobby(id);
  };

  const handleJoinClass = async () => {
    setLoader(true);
    joinRoom();
  };

  return (
    <div className={styles.main}>
      <div className={styles.video}>
        <div className={styles.screen}>
          <div className={styles.video__container}>
            {isHost ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                className={styles.me__video}
              ></video>
            ) : (
              <div
                style={{ width: "100%", height: "100%", borderRadius: "20px" }}
              >
                {Object.values(peers)
                  .filter((peer) => peer.role === "host" && peer.cam)
                  .map((peer) => (
                    <Video key={peer.peerId} track={peer.cam} debug />
                  ))}
                {Object.values(peers)
                  .filter((peer) => peer.role === "host" && peer.mic)
                  .map((peer) => (
                    <Audio key={peer.peerId} track={peer.mic} />
                  ))}
              </div>
            )}
          </div>
        </div>
        {isHost && (
          <div className={styles.base__buttons}>
            <div className={styles.button__container}>
              <div className={styles.button} onClick={toggleAudio}>
                <Image src={audio ? icons.mic : icons.micOff} fill alt="icon" />
              </div>
              <div className={styles.button} onClick={toggleVideo}>
                <Image
                  src={video ? icons.video : icons.videoOff}
                  fill
                  alt="icon"
                />
              </div>
            </div>
            <button className={styles.end__button}>end</button>
          </div>
        )}
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar}>
          {isRoomJoined ? (
            <div className={styles.sidebar__content__container}>
              <div className={styles.topbar}>
                <div
                  className={styles.nav}
                  style={{
                    borderRight: "1px solid white",
                    backgroundColor: content === 1 ? "#181f4a" : null,
                    borderTopLeftRadius: "10px",
                  }}
                  onClick={() => setContent(1)}
                >
                  participants
                </div>
                <div
                  className={styles.nav}
                  onClick={() => setContent(2)}
                  style={{
                    backgroundColor: content === 2 ? "#181f4a" : null,
                    borderTopRightRadius: "10px",
                  }}
                >
                  questions
                </div>
              </div>
              <div className={styles.sidebar__content}>
                {content === 1 ? (
                  <div className={styles.participants}>
                    {Object.values(peers).map((peer) => {
                      return (
                        <div key={peer.peerId} className={styles.participant}>
                          User: {peer.displayName}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.questions}>
                    {questions.map((question) => {
                      return <div className={styles.question}>{question}</div>;
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.sidebar__inner}>
              {loader ? (
                <ThreeDots
                  height="30px"
                  width="100px"
                  color="blueviolet"
                  visible={true}
                />
              ) : (
                <>
                  {isLobbyJoined ? (
                    <button
                      className={styles.lobby__button}
                      onClick={handleJoinClass}
                    >
                      Enter Class
                    </button>
                  ) : (
                    <button
                      className={styles.lobby__button}
                      onClick={handleJoinLobby}
                    >
                      Enter Lobby
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const questions = await getQuestions();

  return {
    props: { questions: questions[id] },
  };
}

export default Room;
