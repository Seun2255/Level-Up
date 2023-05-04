import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/questionModal.module.css";
import Image from "next/image";
import icons from "@/assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { newQuestion } from "@/pages/api/dappAPI";

export default function QuestionModal(props) {
  const { setModal, room } = props;
  const { questions } = useSelector((state) => state.rooms);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  const handleClick = () => {
    setLoading(true);
    newQuestion(room, text).then(() => {
      setLoading(false);
    });
  };

  return (
    <div
      className={styles.outer}
      onClick={(e) => {
        e.stopPropagation();
        setModal(false);
      }}
    >
      <animated.div
        className={styles.container}
        style={popUpEffect}
        onClick={(e) => {
          e.stopPropagation();
          setModal(true);
        }}
      >
        {loading ? (
          <ThreeDots
            height="70%"
            width="100%"
            color="#597dffb7"
            visible={true}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex" }}>
            <div className={styles.questions}>
              <div className={styles.questions__header}>Questions</div>
              <div className={styles.see__questions}>
                {questions[room].map((question, id) => {
                  return (
                    <div key={id} className={styles.question}>
                      {question}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.ask}>
              <h4 className={styles.ask__header}>Ask your question</h4>
              <textarea
                className={styles.ask__input}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button className={styles.ask__button} onClick={handleClick}>
                Ask
              </button>
            </div>
          </div>
        )}
      </animated.div>
    </div>
  );
}
