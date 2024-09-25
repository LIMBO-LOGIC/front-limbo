import styles from "./lineRanking.module.css";

const rankings = [
  {
    position: "4º",
    name: "Aleatorio 4",
    totalPoints: "12.000",
    pointsExchange: "12.000",
  },
  {
    position: "5º",
    name: "Aleatorio 5",
    totalPoints: "10.000",
    pointsExchange: "10.000",
  },
  {
    position: "6º",
    name: "Aleatorio 6",
    totalPoints: "8.000",
    pointsExchange: "8.000",
  },
];

export default function LineRanking() {
  return (
    <div>
      {rankings.map((rank, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.colocacao}>{rank.position}</div>
          <div className={styles.name}>{rank.name}</div>
          <div className={styles.totalpoints}>
            Pontos Totais - {rank.totalPoints}
          </div>
          <div className={styles.pointsexchange}>
            Pontos para Troca - {rank.pointsExchange}
          </div>
        </div>
      ))}
    </div>
  );
}
