import styles from "./home.module.css";
import racingCircuit from "../../assets/racing_circuit.png";
import flagEua from "../../assets/bandeira_eua.png";
import SectionTitle from "../../components/SectionTitle";
import TeamCard from "../../components/TeamCard";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "../../components/RaceCard";
import useTeams from "../../hooks/useTeams";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlAPIChat } from "../../service/api";
import useContexts from "../../hooks/useContext";

export default function Home() {
  const teams = useTeams(3);
  const [races, setRaces] = useState([]);
  const { setIsLoading } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${urlAPIChat}races?count=3`)
      .then((response) => {
        setRaces(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [setIsLoading, setRaces]);

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
              src={flagEua}
              alt="Bandeira do país do circuito"
              className={styles.countryFlag}
            />
            <div className={styles.line}></div>
            <div className={styles.raceText}>
              <p className={styles.location}>Miami</p>
              <p className={styles.round}>9 de Outubro</p>
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
        <ContainerTeamRace listItens={races} element={<RaceCard />} />
      </div>
    </section>
  );
}
