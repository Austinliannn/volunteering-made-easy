import React from "react";
import styles from "./styles.module.css";
import leavesImage from "../../../assets/leaves.jpg";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NavigationBar = ({
  home,
  logout,
  tab1,
  tab1Name,
  tab2,
  tab2Name,
}) => {
  const [isNavListVisible, setNavListVisible] = React.useState(false);
  const navigate = useNavigate();

  const toggleNavList = () => {
    setNavListVisible(!isNavListVisible);
  };

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navContainer}>
        <div className={styles.logo}>
          Voluntering. <br /> Made. <br /> Easy.
          <img
            src={leavesImage}
            className={styles.leavesImage}
            alt="leave-img"
          />
        </div>

        <div className={styles.menuIcon} onClick={toggleNavList}>
          <MenuOutlined />
        </div>

        <div
          className={`${styles.container} ${
            isNavListVisible ? styles.active : ""
          }`}
        >
          <div className={styles.grouping}>
            <Button
              className={styles.content}
              type="text"
              onClick={() => navigate(logout)}
            >
              Log Out
            </Button>
            <Button
              className={styles.content}
              type="text"
              onClick={() => navigate(home)}
            >
              Home
            </Button>
            <Button
              className={styles.content}
              type="text"
              onClick={() => navigate(tab1)}
            >
              {tab1Name}
            </Button>
            <Button
              className={styles.content}
              type="text"
              onClick={() => navigate(tab2)}
            >
              {tab2Name}
            </Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
