import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/walletConnectModal.module.css";
import Image from "next/image";
import icons from "@/assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { setWalletModal } from "@/redux/modals";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { login, updateUser } from "@/redux/user";
import { updateVideos } from "@/redux/videos";
import { setQuestions } from "@/redux/rooms";
import { connect, walletConnect } from "@/pages/api/dappAPI";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { db } from "@/pages/api/database";
import { doc, onSnapshot } from "firebase/firestore";

export default function WalletConnectModal() {
  const dispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { connectAsync } = useConnect();
  const [loading, setLoading] = useState(false);

  const handleWalletConnect = async () => {
    await open();
    dispatch(setWalletModal(false));
    walletConnect().then((userData) => {
      dispatch(setWalletModal(false));
      if (userData) {
        dispatch(login(userData));
        const unsubUser = onSnapshot(
          doc(db, "users", userData.address),
          (doc) => {
            dispatch(updateUser(doc.data()));
          }
        );
        const unsubStore = onSnapshot(doc(db, "data", "videos"), (doc) => {
          console.log(doc.data().data);
          dispatch(updateVideos(doc.data().data));
        });
        const unsubQuestions = onSnapshot(
          doc(db, "data", "questions"),
          (doc) => {
            dispatch(setQuestions(doc.data()));
          }
        );
      } else {
        console.log("Some error occured");
      }
    });
  };

  const handleMetamaskConnect = async () => {
    setLoading(true);
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    connect(account).then((userData) => {
      dispatch(setWalletModal(false));
      if (userData) {
        dispatch(login(userData));
        setLoading(false);
        const unsubUser = onSnapshot(
          doc(db, "users", userData.address),
          (doc) => {
            dispatch(updateUser(doc.data()));
          }
        );
        const unsubStore = onSnapshot(doc(db, "data", "videos"), (doc) => {
          console.log(doc.data().data);
          dispatch(updateVideos(doc.data().data));
        });
        const unsubQuestions = onSnapshot(
          doc(db, "data", "questions"),
          (doc) => {
            dispatch(setQuestions(doc.data()));
          }
        );
      } else {
        console.log("Some error occured");
      }
    });
  };

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
        dispatch(setWalletModal(false));
      }}
    >
      <animated.div
        className={styles.container}
        style={popUpEffect}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setWalletModal(true));
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
          <>
            <button
              className={styles.buttons}
              onClick={() => handleMetamaskConnect()}
            >
              <div className={styles.icons}>
                <Image src={icons.metamask} fill alt="metamask icon" />
              </div>
              Metamask
            </button>
            <button
              className={styles.buttons}
              onClick={() => handleWalletConnect()}
            >
              <div
                className={styles.icons}
                style={{ width: "42px", height: "42px" }}
              >
                <Image
                  src={icons.walletconnect}
                  fill
                  alt="wallet connect icon"
                />
              </div>
              Wallet Connect
            </button>
          </>
        )}
      </animated.div>
    </div>
  );
}
