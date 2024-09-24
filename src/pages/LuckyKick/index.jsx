import { useEffect, useState } from "react";
import CardRaceLucky from "../../components/CardRaceLucky";
import PageTitle from "../../components/PageTitle";
import styles from "./luckyKick.module.css";
import axios from "axios";
import { urlAPIChat } from "../../service/api";

export default function LuckyKick() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlAPIChat}races`, {
        headers: {
          "fiware-service": "smart",
          "fiware-servicepath": "/",
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRaces(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRaces]);

  return (
    <section>
      <PageTitle text="Chute da sorte" />
      <div className={styles.containerCard}>
        {races.map((race, index) => (
          <CardRaceLucky
            key={index}
            idRace={race.id}
            date={race.date}
            city={race.thirstEN}
            flagCountry={`https://res.cloudinary.com/drwk6ohcn/image/upload/v1727012405/Flags/flag_${race.flagCountry}.png`}
            round={race.round}
            circuitImg={`https://res.cloudinary.com/drwk6ohcn/image/upload/v1727012405/Circuits/${race.circuit[1].url}.png`}
          />
        ))}
      </div>
    </section>
  );
}