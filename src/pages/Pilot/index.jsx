import styles from "./pilot.module.css";
import imgPilot from "../../assets/lucas-di-grassi.png";
import imgCar from "../../assets/img_car.svg";

export default function Pilot({ pilot }) {
  const stylePilot = {
    color: '#194997',
  };

  return (
    <section className={styles.pagePilot}>
      <div className={styles.pilot}>
        <div className={styles.boxImg}>
          <img src={imgPilot} alt="Imagem do piloto" />
        </div>
        <div className={styles.boxTitle}>
          <h1>
            Lucas <strong>Di Grassi</strong>
          </h1>
          <h2>
            TEAM <strong>ABT CUPRA Formula E Team</strong>
          </h2>
        </div>
      </div>
      <div className={styles.boxCar}>
        <div className={styles.texts}>
          <p>Team car</p>
          <h3 style={stylePilot}>Mahindra M10Electro</h3>
        </div>
        <div className={styles.imgCar}>
          <img src={imgCar} alt="Imagem do carro" />
        </div>
      </div>
      <div className={styles.valuesCar}>
        <div className={styles.cardValue} style={{border: `1px solid ${stylePilot.color}73`}}>
            <p className={styles.titleCard}>Velocidade</p>
            <p className={styles.valueCard} style={stylePilot}>128<strong style={{opacity: 0.52}}>Km/h</strong></p>
        </div>
        <div className={styles.cardValue} style={{border: `1px solid ${stylePilot.color}73`}}>
            <p className={styles.titleCard}>Velocidade</p>
            <p className={styles.valueCard} style={stylePilot}>128<strong style={{opacity: 0.52}}>Km/h</strong></p>
        </div>
        <div className={styles.cardValue} style={{border: `1px solid ${stylePilot.color}73`}}>
            <p className={styles.titleCard}>Velocidade</p>
            <p className={styles.valueCard} style={stylePilot}>128<strong style={{opacity: 0.52}}>Km/h</strong></p>
        </div>
        <div className={styles.cardValue} style={{border: `1px solid ${stylePilot.color}73`}}>
            <p className={styles.titleCard}>Velocidade</p>
            <p className={styles.valueCard} style={ stylePilot}>128<strong style={{opacity: 0.52}}>Km/h</strong></p>
        </div>
      </div>
    </section>
  );
}
