import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/signInModal.module.css";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getMessage, getAccessToken } from "@huddle01/auth";
import { useAccount, useSignMessage } from "wagmi";

export default function SignInModal(props) {
  const { setSignedIn, setAccessToken } = props;
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const { signMessage } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getAccessToken(data, address);
      setAccessToken(token.accessToken);
      setSignedIn(true);
    },
  });

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  const handleSign = async () => {
    const message = await getMessage(address);
    console.log(message);
    signMessage({ message: message.message });
  };

  return (
    <div className={styles.outer}>
      <animated.div className={styles.container} style={popUpEffect}>
        {loading ? (
          <ThreeDots
            height="70%"
            width="100%"
            color="#597dffb7"
            visible={true}
          />
        ) : (
          <div className={styles.form}>
            <h3 className={styles.form__header}>
              To get Acces to a Token Gated room you must sign in
            </h3>
            <button className={styles.sign__button} onClick={handleSign}>
              Sign In
            </button>
          </div>
        )}
      </animated.div>
    </div>
  );
}
