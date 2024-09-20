import ContainerTeamRace from "../../components/ContainerTeamRace";
import PageTitle from "../../components/PageTitle";
import TeamCard from "../../components/TeamCard";
import useTeams from "../../hooks/useTeams";
import styles from "./teams.module.css";

export default function Teams() {
  const teams = useTeams()

  return (
    <section className={styles.teams}>
      <PageTitle text={'Equipes'}/>
      <div className={styles.boxMain}>
        <ContainerTeamRace listItens={teams} element={<TeamCard />} />
      </div>
    </section>
  );
}
