import React from "react";
import Icon from "../../assets/images/cloud.png";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__content}>
          <img className={styles.header__icon} src={Icon} alt="" />
          <p className={styles.header__text}>MyCloud</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
