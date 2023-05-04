import styles from "@/styles/Components/content.module.css";
import Image from "next/image";
import Sidebar from "./sidebar";
import Rooms from "./Tabs/rooms";
import Home from "./Tabs/allVideos";
import About from "./Tabs/about";
import { useSelector, useDispatch } from "react-redux";
import { setWalletModal } from "@/redux/modals";
import icons from "@/assets/icons/icons";

export default function Content() {
  const { selected } = useSelector((state) => state.tab);
  const { connected } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <Sidebar />
      <main className={styles.view}>
        {connected ? (
          <div className={styles.tabs}>
            {selected === "Content" && <Rooms />}
            {selected === "Home" && <Home />}
            {selected === "About" && <About />}
          </div>
        ) : (
          <div className={styles.icons}>
            <div className={styles.lock__icon}>
              <Image src={icons.lock} alt="lock icon" fill />
            </div>
            <button
              className={styles.connect}
              onClick={() => dispatch(setWalletModal(true))}
            >
              Connect Wallet
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
