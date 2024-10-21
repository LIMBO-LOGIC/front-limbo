import styles from "./races.module.css";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "./../../components/RaceCard/index";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlAPIChat } from "../../service/api";
import useContexts from "../../hooks/useContext";

export default function Races() {
  const [races, setRaces] = useState([])
  const { setIsLoading } = useContexts();

  useEffect(() => {
    setIsLoading(true)

    axios
    .get(`${urlAPIChat}races`)
    .then((response) => {
      console.log(response.data.data)
      setRaces(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })
  }, [setIsLoading, setRaces])

  return (
    <section className={styles.races}>
      <PageTitle text={'Corridas'}/>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={races} element={<RaceCard />} />
      </div>
    </section>
  );
}
