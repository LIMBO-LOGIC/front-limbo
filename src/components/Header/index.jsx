import styles from "./Header.module.css";
import leftImg from "../../assets/header_left.png";
import rightImg from "../../assets/header_right.png";
import brasil from "../../assets/bandeira_brasil.png";

export default function Header() {
  return (
    <div className={styles.headerStyled}>
      <div className={styles.leftSection}>
        <img src={leftImg} alt="Imagem à esquerda" className={styles.image} />
      </div>
      <div className={styles.rightSection}>
        <img src={rightImg} alt="Imagem à direita" className={styles.image} />
        <div className={styles.textOverlay}>
          <p className={styles.raceText}>Próxima Corrida:</p>
          <img src={brasil} alt="Bandeira do Brasil" className={styles.flag} />
        </div>
        <divisor></divisor>
        <p className={styles.location}>São Paulo</p>
        <p className={styles.round}>ROUND 1</p>
      </div>
    </div>
  );
}
