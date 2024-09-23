import { useEffect, useState } from "react";
import styles from "./choiceLucky.module.css";
import { urlAPIChat } from "../../service/api";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { useParams } from "react-router-dom";
import Sortable from "../../components/SortableList";

export default function ChoiceLucky() {
  const { idRace } = useParams();
  const [race, setRace] = useState("");
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    axios
      .get(`${urlAPIChat}races/${idRace}`, {
        headers: {
          "fiware-service": "smart",
          "fiware-servicepath": "/",
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRace(response.data.data[0]);
        setPilots(response.data.data[0].pilots);
        console.log(response.data.data[0].pilots);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRace, idRace]);

  return (
    <section className={styles.choiceLucky}>
      <PageTitle text={race == "" ? 'Carregando ...' : `Round ${race.round} - ${race.thirstEN}`}/>
      <div className={styles.titles}>
        <h2>Pilotos</h2>
        <button className={styles.btnSalve}>Salvar</button>
      </div>
      <Sortable items={pilots} setItems={setPilots}/>
    </section>
  );
}
