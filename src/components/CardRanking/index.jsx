import React from "react";
import { FaMedal } from "react-icons/fa"; // Importando o ícone da medalha
import styles from "./CardRanking.module.css";
import fotoProfile from "../../assets/foto_profile_ranking.png";

const users = [
  {
    name: "Luiz Gustavo",
    username: "Luiz Gusta",
    totalPoints: 15000,
    pointsExchange: 12000,
    medal: "gold",
  },
  {
    name: "Maria Silva",
    username: "Maria S.",
    totalPoints: 20000,
    pointsExchange: 18000,
    medal: "silver",
  },
  {
    name: "Carlos Jose",
    username: "Carlos J.",
    totalPoints: 10000,
    pointsExchange: 8000,
    medal: "bronze",
  },
];

export default function CardRanking() {
  return (
    <div className={styles.container}>
      {users.map((user, index) => (
        <div key={index} className={styles.box1}>
          <div className={styles.CardPhoto}>
            <img src={fotoProfile} alt="Foto do Perfil" />
            <div className={styles.medal}>
              <FaMedal
                color={
                  user.medal === "gold"
                    ? "gold"
                    : user.medal === "silver"
                    ? "silver"
                    : "#cd7f32"
                }
              />
            </div>
          </div>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.username}>{user.username}</div>
          <div className={styles.totalpoints}>Total de Pontos</div>
          <div className={styles.totalpointsNumber}>
            {user.totalPoints.toLocaleString()}
          </div>
          <div className={styles.pointsexchange}>Pontos para Troca</div>
          <div className={styles.pointsexchangeNumber}>
            {user.pointsExchange.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
