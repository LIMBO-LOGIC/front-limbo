import styles from './Footer.module.css';
import LogoLimboLogic from "../../assets/LimboLogicLogo.png";
import LogoWpp from "../../assets/WppLogo.png";
import LogoInsta from "../../assets/instaLogo.png";
import LogoLinkedin from "../../assets/LinkedinLogo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img src={LogoLimboLogic} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.copyright}>
        © 2024 LimboLogic
      </div>
      <div className={styles.socialMedia}>
        <a href="https://wa.me/your-link" target="_blank" rel="noopener noreferrer">
          <img src={LogoWpp} alt="WhatsApp" className={styles.icon} />
        </a>
        <a href="https://instagram.com/your-link" target="_blank" rel="noopener noreferrer">
          <img src={LogoInsta} alt="Instagram" className={styles.icon} />
        </a>
        <a href="https://linkedin.com/your-link" target="_blank" rel="noopener noreferrer">
          <img src={LogoLinkedin} alt="LinkedIn" className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
