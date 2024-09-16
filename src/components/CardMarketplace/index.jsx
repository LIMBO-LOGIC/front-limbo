import { FaHeart } from "react-icons/fa";
import styles from "./cardMarketplace.module.css";

export default function CardMarketplace() {
  return (
    <div className={styles.cardMarketplace}>
      <img src="" alt="" />
      <div className={styles.dataCard}>
        <div className={styles.boxTitle}>
          <div className={styles.titles}>
            <h2>Airpods Pro</h2>
            <h3>Wireless Noise Cancelling Earphones</h3>
          </div>
          <FaHeart />
        </div>
        <p>Airpods  Pro have been designed to deliver active noise cancellation for immersive sounds. Transparency mode so you can hear your surroundings.</p>
        <div className={styles.points}>
            <p>150 pontos</p>
            <span className={styles.btnRedeem}>Resgatar</span>
        </div>
      </div>
    </div>
  );
}
