import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/signInModal.module.css";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function WarningModal(props) {
  const { setModal } = props;

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

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
        <div className={styles.form}>
          <h3 className={styles.form__header}>
            You are not authorized to join this Lobby
          </h3>
        </div>
      </animated.div>
    </div>
  );
}
