import ContainerTeamRace from "../../components/ContainerTeamRace";
import PageTitle from "../../components/PageTitle";
import TeamCard from "../../components/TeamCard";
import styles from "./teams.module.css";

export default function Teams() {
  const list = ["carro1", "carro2", "carro3", "carro1", "carro2", "carro3","carro1", "carro2", "carro3"];

  return (
    <section className={styles.teams}>
      <PageTitle text={'Equipes'}/>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={list} element={<TeamCard />} />
      </div>
    </section>
  );
}
