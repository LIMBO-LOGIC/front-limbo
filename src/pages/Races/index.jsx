import styles from "./races.module.css";
import ContainerTeamRace from "../../components/ContainerTeamRace";
import RaceCard from "./../../components/RaceCard/index";
import PageTitle from "../../components/PageTitle";

export default function Races() {
  const list = [
    "carro1",
    "carro2",
    "carro3",
    "carro1",
    "carro2",
    "carro3",
    "carro1",
    "carro2",
    "carro3",
  ];

  return (
    <section className={styles.races}>
      <PageTitle text={'Corridas'}/>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={list} element={<RaceCard />} />
      </div>
    </section>
  );
}
