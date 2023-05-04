import Image from "next/image";
import styles from "@/styles/Components/card.module.css";
import icons from "@/assets/icons/icons";
import { useSelector, useDispatch } from "react-redux";
import { setViewRoomModal } from "@/redux/modals";
import addressShortener from "@/utils/addressShortener";

export default function Card(props) {
  const { details, select } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={styles.main}
      onClick={() => {
        select();
        dispatch(setViewRoomModal(true));
      }}
    >
      <h3 className={styles.host}>{addressShortener(details.host)}</h3>
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
      <div className={styles.topic}>{details.topic}</div>
    </div>
  );
}
