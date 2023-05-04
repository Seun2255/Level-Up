import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Components/navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setWalletModal } from "@/redux/modals";
import addressShortener from "@/utils/addressShortener";
import icons from "@/assets/icons/icons";

export default function Navbar() {
  const { walletModal } = useSelector((state) => state.modals);
  const { user, connected } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Image src={icons.logo} alt="logo" fill />
      </div>
      <nav className={styles.nav}>
        <button className={styles.mode}></button>
        {connected ? (
          <button className={styles.connect}>
            {addressShortener(user.address)}
          </button>
        ) : (
          <button
            className={styles.connect}
            onClick={() => dispatch(setWalletModal(true))}
          >
            Connect Wallet
          </button>
        )}
      </nav>
    </div>
  );
}
