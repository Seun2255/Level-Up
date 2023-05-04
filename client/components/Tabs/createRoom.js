import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Tabs/createRoom.module.css";
import icons from "@/assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCreateRoomModal } from "@/redux/modals";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { ThreeDots } from "react-loader-spinner";
import { createClass } from "../../pages/api/dappAPI";
import linkCreator from "@/utils/linkCreator";
import lighthouseUpload from "@/utils/lighthouseUpload";
import { createRoom, createGatedRoom } from "@/pages/api/huddle";
import Datetime from "react-datetime";
import moment from "moment";
import AccessModal from "@/modals/accessModal";

export default function CreateRoom() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [about, setAbout] = useState("");
  const [time, setTime] = useState(moment().format());
  const [questions, setQuestions] = useState(false);
  const [picHovered, setPicHovered] = useState(false);

  const [pic, setPic] = useState("");
  const [fileUpload, setFileUpload] = useState("");
  const [picLoader, setPicLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [privateClass, setPrivateClass] = useState(false);
  const [accessModal, setAccessModal] = useState(false);
  const [accessDetails, setAccessDetails] = useState({});

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "160px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 500 },
  });

  const handleFileUpload = async (e) => {
    setPicLoader(true);
    const output = await lighthouseUpload(
      e,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
    );
    console.log("File status: ", output);

    if (output) {
      const url = linkCreator(output.data.Hash);
      setFileUpload(url);
      setPic(url);
      setPicLoader(false);
    }
  };

  const handleCreate = async () => {
    setLoader(true);
    createRoom(user.address, topic, time).then((data) => {
      createClass(topic, about, pic, data.roomId, time, false).then(() => {
        setLoader(false);
        dispatch(setCreateRoomModal(false));
      });
    });
  };

  const handleCreateSecure = async () => {
    console.log(accessDetails);
    setLoader(true);
    createGatedRoom(
      user.address,
      topic,
      time,
      accessDetails.tokenType,
      accessDetails.chain,
      accessDetails.contractAddress
    ).then((data) => {
      console.log(data);
      console.log("Gated Room Created");
      createClass(topic, about, pic, data.roomId, time, true).then(() => {
        setLoader(false);
        dispatch(setCreateRoomModal(false));
      });
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <div
          className={styles.back__button}
          onClick={() => dispatch(setCreateRoomModal(false))}
        >
          <div className={styles.icon}>
            <Image src={icons.backArrow} alt="back icon" fill />
          </div>
          Back
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.form}>
          <h2>Room information</h2>
          <div
            className={styles.thumbnail}
            onMouseEnter={() => setPicHovered(true)}
            onMouseLeave={() => setPicHovered(false)}
          >
            {picLoader ? (
              <ThreeDots
                height="40%"
                width="100%"
                color="#597dff"
                visible={true}
              />
            ) : (
              <div className={styles.thumbnail__box}>
                {pic !== "" ? (
                  <img
                    src={pic}
                    alt="profile pic"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                ) : picHovered ? (
                  <label htmlFor="pic-upload" className={styles.add__pic}>
                    <animated.div
                      className={styles.plus__icon}
                      style={popUpEffect}
                    >
                      <Image src={icons.circleAdd} alt="plus icon" fill />
                    </animated.div>
                  </label>
                ) : (
                  <div className={styles.default}>
                    <Image src={icons.logo} alt="logo" fill />
                  </div>
                )}
              </div>
            )}
          </div>

          <label htmlFor="pic-upload" className={styles.thumbnail__button}>
            Upload thumbnail
          </label>
          <input
            id="pic-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          <h5 className={styles.header}>Topic</h5>
          <input
            className={styles.input}
            onChange={(e) => setTopic(e.target.value)}
          />

          <h5 className={styles.header}>About</h5>
          <input
            className={styles.input}
            onChange={(e) => setAbout(e.target.value)}
          />

          <h5 className={styles.header}>Time</h5>
          <Datetime
            initialViewMode="time"
            initialValue={new Date()}
            input={false}
            className={styles.calendar}
            onChange={(time) => {
              setTime(time.format());
            }}
          />

          <div className={styles.private__group}>
            <h5 className={styles.header__private}>Private: </h5>
            <div className={styles.button__group}>
              <button
                className={styles.option__button}
                onClick={() => setPrivateClass(true)}
                style={{
                  backgroundColor: privateClass ? "#597dff" : null,
                  color: privateClass ? null : "#597dff",
                  borderRight: "1px solid white",
                }}
              >
                yes
              </button>
              <button
                className={styles.option__button}
                onClick={() => setPrivateClass(false)}
                style={{
                  backgroundColor: privateClass ? null : "#597dff",
                  color: privateClass ? "#597dff" : null,
                }}
              >
                no
              </button>
            </div>
            {privateClass && (
              <button
                className={styles.acces__button}
                onClick={() => setAccessModal(true)}
              >
                setAccesDetails
              </button>
            )}
          </div>

          <button
            className={styles.create__button}
            onClick={privateClass ? handleCreateSecure : handleCreate}
          >
            {loader ? (
              <ThreeDots
                height="30px"
                width="82px"
                color="white"
                visible={true}
              />
            ) : (
              "Create Room"
            )}
          </button>
        </div>
      </div>

      {accessModal && (
        <AccessModal
          setAccessModal={setAccessModal}
          setAccessDetails={setAccessDetails}
        />
      )}
    </div>
  );
}
