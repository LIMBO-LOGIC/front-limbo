import styles from "./home.module.css";
import racingCircuit from "../../assets/racing_circuit.png";
import flagBrazil from "../../assets/bandeira_brasil.png";
import SectionTitle from "../../components/SectionTitle";
import TeamCard from "../../components/TeamCard";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "../../components/RaceCard";
import useTeams from "../../hooks/useTeams";
import { useEffect } from "react";

export default function Home() {
  const teams = useTeams(3)

  useEffect(() => {
    console.log(teams);
  })

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
        <SectionTitle title={"Equipes"} route={"/race/teams"} />
        <ContainerTeamRace listItens={teams} element={<TeamCard />} />
      </div>
      <div className={styles.raceSection}>
        <SectionTitle title={"Corridas"} route={"/race/races"} />
        <ContainerTeamRace listItens={teams} element={<RaceCard />} />
      </div>
    </section>
  );
}
