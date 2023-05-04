import Image from "next/image";
import styles from "@/styles/Components/sidebar.module.css";
import icons from "@/assets/icons/icons";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "@/redux/tab";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [hoveredOver, setHoveredOver] = useState("");

  const { selected } = useSelector((state) => state.tab);
  const dispatch = useDispatch();

  const [spring, api] = useSpring(() => {
    from: {
      width: "44px";
    }
  });

  const handleSidebar = (e) => {
    if (e.type !== "mouseenter") setTextVisible(false);

    e.type === "mouseenter"
      ? api.start({
          from: {
            width: "46px",
          },
          to: {
            width: "320px",
          },
          config: {
            duration: 10,
          },
          onRest: () => setTextVisible(true),
        })
      : api.start({
          from: {
            width: "320px",
          },
          to: {
            width: "46px",
          },
          config: {
            duration: 10,
          },
        });
  };

  return (
    <div className={styles.container}>
      <animated.div
        className={styles.main}
        onMouseEnter={handleSidebar}
        onMouseLeave={handleSidebar}
      >
        <div className={styles.nav}>
          {navs.map((nav, id) => {
            return (
              <div
                className={styles.nav__button}
                style={
                  selected === navigation[nav][0]
                    ? { ...spring, backgroundColor: "#22262a" }
                    : { spring }
                }
                key={id}
                onClick={() => {
                  dispatch(setTab(navigation[nav][0]));
                }}
                onMouseEnter={() => {
                  setHoveredOver(navigation[nav][0]);
                }}
                onMouseLeave={() => {
                  setHoveredOver("");
                }}
              >
                <div
                  className={
                    selected === navigation[nav][0]
                      ? styles.nav__icon__filtered
                      : styles.nav__icon
                  }
                >
                  <Image src={navigation[nav][1]} fill alt="icon" />
                </div>

                {textVisible && (
                  <div
                    className={styles.nav__text}
                    style={
                      selected === navigation[nav][0]
                        ? { color: "#597dff" }
                        : {}
                    }
                  >
                    {navigation[nav][0]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </animated.div>
    </div>
  );
};

export default Sidebar;

const navigation = {
  home: ["Home", icons.home],
  content: ["Content", icons.content],
  about: ["About", icons.about],
  profile: ["Profile", icons.profile],
};

const navs = Object.keys(navigation);
