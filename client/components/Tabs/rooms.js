import Image from "next/image";
import icons from "@/assets/icons/icons";
import styles from "@/styles/Tabs/rooms.module.css";
import CreateRoom from "./createRoom";
import ViewRoom from "./viewRoom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreateRoomModal } from "@/redux/modals";
import Card from "../card";

export default function Rooms() {
  const { createRoomModal, viewRoomModal } = useSelector(
    (state) => state.modals
  );
  const { user } = useSelector((state) => state.user);
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <h4>Rooms</h4>
        <button onClick={() => dispatch(setCreateRoomModal(true))}>
          New
          <div className={styles.add__icon}>
            <Image src={icons.plus} alt="add icon" fill />
          </div>
        </button>
      </div>
      {user.videos.length < 1 ? (
        <div className={styles.empty}>
          <div className={styles.folder__icon}>
            <Image src={icons.classroom} alt="folder icon" fill />
          </div>
          <button
            className={styles.create__button}
            onClick={() => dispatch(setCreateRoomModal(true))}
          >
            Create Class
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {user.videos.map((room, id) => {
            return (
              <Card key={id} details={room} select={() => setSelected(room)} />
            );
          })}
        </div>
      )}

      {createRoomModal && <CreateRoom />}
      {viewRoomModal && <ViewRoom details={selected} host={true} />}
    </div>
  );
}
