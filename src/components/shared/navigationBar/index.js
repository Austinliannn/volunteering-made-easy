import React from "react";
import styles from "./styles.module.css";
import leavesImage from "../../../assets/leaves.jpg";
import { MenuOutlined } from "@ant-design/icons";

export const NavigationBar = () => {
  const [isNavListVisible, setNavListVisible] = React.useState(false);

  const toggleNavList = () => {
    setNavListVisible(!isNavListVisible);
  };

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          Voluntering. <br /> Made. <br /> Easy.
          <img
            src={leavesImage}
            className={styles.leavesImage}
            alt="leave-img"
          />
        </div>

        <div className={styles.textStyle}>Welcome, John</div>

        <div className={styles.menuIcon} onClick={toggleNavList}>
          <MenuOutlined />
        </div>

        <div
          className={`${styles.container} ${
            isNavListVisible ? styles.active : ""
          }`}
        >
          <div className={styles.grouping}>
            <div className={styles.content}>Log Out</div>
            <div className={styles.content}>Home</div>
            <div className={styles.content}>Profile</div>
            <div className={styles.content}>Tracker</div>
          </div>
        </div>
      </div>
    </>
  );
}