import styles from "./home.module.css";
import SectionTitle from "../../components/SectionTitle";
import TeamCard from "../../components/TeamCard";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "../../components/RaceCard";
import useTeams from "../../hooks/useTeams";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, urlAPIChat } from "../../service/api";
import useContexts from "../../hooks/useContext";

export default function Home() {
  const teams = useTeams(3);
  const [races, setRaces] = useState([]);
  const [nextRace, setNextRace] = useState(null);
  const { setIsLoading } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/racing/nearest`)
      .then((response) => {
        console.log(response.data)
        setNextRace(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [setNextRace, setIsLoading])

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'long' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <section className={styles.home}>
      <div className={styles.nextRace}>
        <img
          src={nextRace?.circuit_image}
          alt="Circuito da corrida"
          className={styles.racingCircuit}
        />
        <div className={styles.dataRace}>
          <p className={styles.title}>Próxima Corrida:</p>
          <div className={styles.locationRace}>
            <img
              src={nextRace?.country_flag}
              alt="Bandeira do país do circuito"
              className={styles.countryFlag}
            />
            <div className={styles.line}></div>
            <div className={styles.raceText}>
              <p className={styles.location}>{nextRace?.circuit_location}</p>
              <p className={styles.round}>{nextRace && formatDate(nextRace?.race_date)}</p>
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
