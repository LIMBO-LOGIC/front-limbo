import ContainerTeamRace from "../../components/ContainerTeam";
import styles from "./races.module.css";
import RaceCard from './../../components/RaceCard/index';

export default function Races(){
    const list = ["carro1", "carro2", "carro3", "carro1", "carro2", "carro3","carro1", "carro2", "carro3"];

  return (
    <section className={styles.races}>
      <h1>Corridas</h1>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={list} element={<RaceCard />} />
      </div>
    </section>
  );
}