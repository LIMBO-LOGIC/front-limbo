import { FaMedal } from "react-icons/fa"; // Importando o ícone da medalha
import styles from "./cardRanking.module.css";

export default function CardRanking({ rankingData }) {
  return (
    <div className={styles.container}>
      {rankingData.slice(0, 3).map((user, index) => (
        <div key={index} className={styles.box1}>
          <div className={styles.CardPhoto}>
            <img
              src={user.profile_picture || "defaultProfilePic.jpg"}
              alt="Foto do Perfil"
              className={styles.CardPhoto_Photo}
            />
            <div className={styles.medal}>
              <FaMedal
                color={
                  index === 0 ? "gold" : index === 1 ? "silver" : "#cd7f32"
                }
              />
            </div>
          </div>
          <div className={styles.name}>{user.fullname}</div>
          <div className={styles.username}>{user.nickname}</div>
          <div className={styles.totalpoints}>Total de Pontos</div>
          <div className={styles.totalpointsNumber}>
            {parseInt(user.all_points).toLocaleString()}
          </div>
          <div className={styles.pointsexchange}>Pontos Atuais</div>
          <div className={styles.pointsexchangeNumber}>
            {parseInt(user.current_points).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
