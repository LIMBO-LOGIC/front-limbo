import { useEffect, useState } from "react";
import CardRaceLucky from "../../components/CardRaceLucky";
import PageTitle from "../../components/PageTitle";
import styles from "./luckyKick.module.css";
import axios from "axios";
import { baseUrl } from "../../service/api";
import useContexts from "../../hooks/useContext";

export default function LuckyKick() {
  const [races, setRaces] = useState([]);
  const [racesUser, setRacesUser] = useState([]);
  const { setIsLoading, dataUser } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/racing`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    setIsLoading(true);
    axios
      .get(`${baseUrl}/racing-bets/user/${dataUser.id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRacesUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [setRaces, setIsLoading, dataUser]);

  return (
    <section>
      <PageTitle text="Chute da sorte" />
      <div className={styles.containerCard}>
        {races.map((race, index) => (
          <CardRaceLucky
            key={index}
            idRace={race.id_racing}
            date={race.race_date}
            city={race.circuit_location}
            flagCountry={race.country_flag}
            round={race.round}
            circuitImg={race.circuit_image}
            status={racesUser.some((raceU) => raceU.id_race === race.id_race)}
          />
        ))}
      </div>
    </section>
  );
}
