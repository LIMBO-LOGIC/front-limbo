import styles from "./races.module.css";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "./../../components/RaceCard/index";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { IP_ADRESS_IOT_TESTE } from "../../service/api";

export default function Races() {
  const [races, setRaces] = useState([])


  useEffect(() => {
    axios
    .get(`http://${IP_ADRESS_IOT_TESTE}:8080/races`)
    .then((response) => {
      setRaces(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  })

  return (
    <section className={styles.races}>
      <PageTitle text={'Corridas'}/>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={races} element={<RaceCard />} />
      </div>
    </section>
  );
}
