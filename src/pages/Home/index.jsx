import styles from "./home.module.css";
import racingCircuit from "../../assets/racingCircuit.png";
import flagBrazil from "../../assets/bandeira_brasil.png";
import SectionTitle from "../../components/SectionTitle";
import TeamCard from "../../components/TeamCard";
import ContainerTeamRace from "../../components/ContainerTeam";
import RaceCard from "../../components/RaceCard";

export default function Home() {
  const list = ['carro1', 'carro2', 'carro3']
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
      <div className={styles.teamSection}>
        <SectionTitle title={"Equipes"} route={"/race"} />
        <ContainerTeamRace listItens={list} element={<TeamCard />}/>
      </div>
      <div className={styles.raceSection}>
        <SectionTitle title={"Corridas"} route={"/race"} />
        <ContainerTeamRace listItens={list} element={<RaceCard />}/>
      </div>
    </section>
  );
}
