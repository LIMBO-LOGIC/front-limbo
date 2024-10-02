import styles from "./lineRanking.module.css";

export default function LineRanking({ rankingData }) {
  return (
    <div>
      {rankingData.slice(3).map((user, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.colocacao}>{index + 4}º</div>{" "}
          {/* Adicionando a posição */}
          <div className={styles.name}>
            {user.fullname.split(" ").slice(0, 2).join(" ")}
          </div>
          <div className={styles.totalpoints}>
            Pontos Totais - {parseInt(user.all_points).toLocaleString()}
          </div>
          <div className={styles.pointsexchange}>
            Pontos Atuais - {parseInt(user.current_points).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
