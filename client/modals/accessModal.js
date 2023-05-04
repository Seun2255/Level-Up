import { animated, useSpring } from "@react-spring/web";
import styles from "@/styles/Modals/accessModal.module.css";
import Image from "next/image";
import icons from "@/assets/icons/icons";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import DropdownButton from "@/components/dropDownButton";

export default function AccessModal(props) {
  const { setAccessModal, setAccessDetails } = props;
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  const [chain, setChain] = useState();
  const [address, setAddress] = useState("");

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  const handleSave = () => {
    const details = {
      tokenType: type,
      chain: chain,
      contractAddress: address,
    };

    setAccessDetails(details);
    setAccessModal(false);
  };

  return (
    <div
      className={styles.outer}
      onClick={(e) => {
        e.stopPropagation();
        setAccessModal(false);
      }}
    >
      <animated.div
        className={styles.container}
        style={popUpEffect}
        onClick={(e) => {
          e.stopPropagation();
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
          <div className={styles.form}>
            <h3 className={styles.header}>Acces Details</h3>

            <div className={styles.option__box}>
              <span className={styles.choice__name}>Token type:</span>
              <DropdownButton options={tokenOptions} onSelect={setType} />
            </div>

            <div className={styles.option__box}>
              <span className={styles.choice__name}>Chain:</span>
              <DropdownButton options={chains} onSelect={setChain} />
            </div>

            <div className={styles.option__box}>
              <h5 className={styles.choice__name}>Contract Address:</h5>
              <input
                className={styles.input}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button className={styles.create__button} onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </animated.div>
    </div>
  );
}

const tokenOptions = ["ERC721", "ERC20", "ERC1155", "BEP20"];
const chains = ["ETHEREUM", "COSMOS", "SOLANA", "TEZOS", "BSC"];
