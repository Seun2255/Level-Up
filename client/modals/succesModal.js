import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/succesModal.module.css";
import { useSelector } from "react-redux";

export default function SuccesModal(props) {
  const { succesModalText } = useSelector((state) => state.modals);

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  return (
    <div className={styles.outer}>
      <animated.div className={styles.container}>
        <h3 className={styles.text}>{succesModalText}</h3>
      </animated.div>
    </div>
  );
}
