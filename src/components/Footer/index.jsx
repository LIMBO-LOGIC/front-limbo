import styles from "./footer.module.css";
import LogoLimboLogic from "../../assets/LimboLogicLogo.png";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img src={LogoLimboLogic} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.copyright}>© 2024 LimboLogic</div>
      <div className={styles.socialMedia}>
        <a
          className={styles.iconMedia}
          href="https://wa.me/your-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>
        <a
          className={styles.iconMedia}
          href="https://instagram.com/your-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          className={styles.iconMedia}
          href="https://linkedin.com/your-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
