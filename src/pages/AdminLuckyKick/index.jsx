import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import styles from "./adminLuckyKick.module.css";
import axios from "axios";
import { baseUrl } from "../../service/api";
import useContexts from "../../hooks/useContext";
import AdminCardRaceLucky from "../../components/AdminCardaceLucky";
import AdminTitle from "../../components/AdminTitle";

export default function AdminLuckyKick() {
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
      <div className="px-4 pt-4">
        <AdminTitle text="Chute da sorte" icon={""} />
      </div>
      <div className={styles.containerCard}>
        {races.map((race, index) => (
          <AdminCardRaceLucky
            key={index}
            idRace={race.id_racing}
            date={race.race_date}
            city={race.circuit_location}
            flagCountry={race.country_flag}
            round={race.round}
            circuitImg={race.circuit_image}
            isExist={racesUser.filter(
              (raceU) => raceU.racing.id_racing === race.id_racing
            )}
            result={race.result_racing}
          />
        ))}
      </div>
    </section>
  );
}
