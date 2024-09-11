import styles from "./home.module.css";
import racingCircuit from "../../assets/racingCircuit.png";
import flagBrazil from '../../assets/bandeira_brasil.png'

export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.nextRace}>
        <img
          src={racingCircuit}
          alt="Circuito da corrida"
          className={styles.racingCircuit}
        />
        <div className={styles.dataRace}>
          <p className={styles.title}>Próxima Corrida:</p>
          <div className={styles.locationRace}>
            <img
              src={flagBrazil}
              alt="Bandeira do país do circuito"
              className={styles.countryFlag}
            />
            <div className={styles.line}></div>
            <div className={styles.raceText}>
              <p className={styles.location}>São Paulo</p>
              <p className={styles.round}>ROUND 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
