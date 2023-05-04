import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Tabs/viewRoom.module.css";
import icons from "@/assets/icons/icons";
import { useDispatch } from "react-redux";
import { setViewRoomModal } from "@/redux/modals";
import { setQuestions } from "@/redux/rooms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionModal from "@/modals/questionModal";
import goToRoom from "@/utils/goToRoom";
import { getQuestions } from "@/pages/api/database";
import moment from "moment";

export default function ViewRoom(props) {
  const { details, host } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [questionsModal, setQuestionsModal] = useState(false);
  const time = moment(details.time);

  const handleClick = () => {
    goToRoom(details.classId, details.gated);
  };

  useEffect(() => {
    getQuestions(details.classId).then((data) => {
      dispatch(setQuestions(data));
    });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <div
          className={styles.back__button}
          onClick={() => dispatch(setViewRoomModal(false))}
        >
          <div className={styles.icon}>
            <Image src={icons.backArrow} alt="back icon" fill />
          </div>
          Back
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.left}>
            <div className={styles.thumbnail}>
              {details.cover === "" ? (
                <div className={styles.logo}>
                  <Image src={icons.logo} alt="logo" fill />
                </div>
              ) : (
                <img
                  src={details.cover}
                  alt="profile pic"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              )}
            </div>
          </div>

          <div className={styles.right}>
            <h5 className={styles.header}>
              Topic: <span className={styles.header__box}>{details.topic}</span>
            </h5>

            <h5 className={styles.header} style={{ marginBottom: "0px" }}>
              {moment().isAfter(time)
                ? `Started ${moment().to(time)}`
                : `Starts ${moment().to(time)}`}
            </h5>

            <h5 className={styles.about}>
              <h5 className={styles.about__header}>About:</h5>{" "}
              <div className={styles.about__box}>{details.about}</div>
            </h5>

            <div className={styles.buttons}>
              <button
                className={styles.join__room}
                onClick={() => setQuestionsModal(true)}
                disabled={moment().isAfter(time) ? true : false}
              >
                Questions
              </button>

              <button
                className={styles.join__room}
                onClick={handleClick}
                disabled={moment().isAfter(time) ? false : true}
              >
                {host ? "Start Class" : "Join Class"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {questionsModal && (
        <QuestionModal setModal={setQuestionsModal} room={details.classId} />
      )}
    </div>
  );
}
