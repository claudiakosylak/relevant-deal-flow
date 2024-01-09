import React from "react";
import styles from "./Footer.module.sass";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.author}>
        <div className={styles.icons}>
          <a href="https://www.linkedin.com/in/claudiakosylak/" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/claudiakosylak" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
        <p>Developed by Claudia Kosylak</p>
      </div>
    </footer>
  );
};

export default Footer;
