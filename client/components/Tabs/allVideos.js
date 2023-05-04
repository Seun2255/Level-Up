import Image from "next/image";
import icons from "@/assets/icons/icons";
import styles from "@/styles/Tabs/home.module.css";
import CreateRoom from "./createRoom";
import ViewRoom from "./viewRoom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCreateRoomModal } from "@/redux/modals";
import Card from "../card";
import { animated, useSpring } from "@react-spring/web";
import searchVideo from "@/utils/search";

export default function Home() {
  const { viewRoomModal } = useSelector((state) => state.modals);
  const { videos } = useSelector((state) => state.videos);
  const [selected, setSelected] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [displayedVideos, setDisplayedVideos] = useState(videos);
  const [text, setText] = useState("");

  const searchBox = useSpring({
    width: searchActive ? "300px" : "224px",
    config: { duration: 300 },
  });

  const handleSearch = (e) => {
    const result = searchVideo(videos, e.target.value);
    setDisplayedVideos(result);
  };

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <h4>Classes</h4>
        <animated.div
          className={styles.search__button}
          style={searchBox}
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
        >
          <div className={styles.search__icon}>
            <Image src={icons.search} flll alt="search icon" />
          </div>
          <input
            type="text"
            className={styles.search__input}
            placeholder="Search..."
            onChange={(e) => handleSearch(e)}
          />
        </animated.div>
      </div>
      {videos.length < 1 ? (
        <div className={styles.empty}>
          <div className={styles.folder__icon}>
            <Image src={icons.classroom} alt="folder icon" fill />
          </div>
          <div style={{ fontSize: "30px", color: "white" }}>
            Nothing here yet
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {displayedVideos.map((room, id) => {
            return (
              <Card key={id} details={room} select={() => setSelected(room)} />
            );
          })}
        </div>
      )}

      {viewRoomModal && <ViewRoom details={selected} host={false} />}
    </div>
  );
}
