import Navbar from "../components/navbar";
import Content from "../components/content";
import WalletConnectModal from "../modals/walletConnectModal";
import styles from "@/styles/Home.module.css";
import SuccesModal from "@/modals/succesModal";
import { useSelector } from "react-redux";

export default function Home() {
  const { walletModal, succesModal } = useSelector((state) => state.modals);

  return (
    <div className={styles.main}>
      <Navbar />
      <Content />
      {walletModal && <WalletConnectModal />}
      {succesModal && <SuccesModal />}
    </div>
  );
}
