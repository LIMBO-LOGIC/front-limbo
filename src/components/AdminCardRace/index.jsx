import { useNavigate } from "react-router-dom";
import styles from "./adminCardRace.module.css";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";

AdminCardRace.propTypes = {
  idRace: PropTypes.number,
  date: PropTypes.string,
  city: PropTypes.string,
  flagCountry: PropTypes.string,
  round: PropTypes.number,
  circuitImg: PropTypes.string,
  isExist: PropTypes.array,
};

export default function AdminCardRace({
  idRace,
  date,
  city,
  flagCountry,
  round,
  circuitImg,
  isExist,
}) {
  const navigate = useNavigate();
  const [dayMonth, setDayMonth] = useState([]);
  const status = isExist.length > 0;

  useEffect(() => {
    const monthsAbbrev = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    // Renomeie a variável para evitar conflito
    const parsedDate = new Date(date);
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = monthsAbbrev[parsedDate.getMonth()];

    setDayMonth([day, month]);
  }, [date]);

  const handleRaceColor = () => {
    if (date == null) {
      return "#FB0F0F";
    }

    const targetDate = new Date(date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate < currentDate) {
      return "#0F233B";
    } else if (targetDate.getTime() === currentDate.getTime()) {
      return "#D2B300";
    } else {
      return "#B3B8BC";
    }
  };

  const handleRaceText = () => {
    if (date == null) {
      return "cancelada";
    }

    const targetDate = new Date(date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate < currentDate) {
      return "finalizada";
    } else if (targetDate.getTime() === currentDate.getTime()) {
      return "hoje";
    } else {
      return "agendada";
    }
  };

  return (
    <div className={styles.cardRaceLuck}>
      <div className={styles.containerCard}>
        <div className={styles.boxData}>
          <div className={styles.boxDate}>
            <p className={styles.day}>{dayMonth[0]}</p>
            <p className={styles.month}>{dayMonth[1]}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.boxLocationRound}>
            <p className={styles.location}>{city}</p>
            <p className={styles.round}>Round {round}</p>
          </div>
        </div>
        <img
          src={flagCountry}
          alt="Imagem da bandeira do país"
          className={styles.flagCountry}
        />
      </div>

      <img
        src={circuitImg}
        alt="Imagem do circuito"
        className={styles.circuit}
      />

      <div className={styles.boxTags}>
        <span
          style={{ backgroundColor: handleRaceColor() }}
          className={styles.tag}
        >
          Corrida {handleRaceText()}
        </span>

        {handleRaceText() == "cancelada" ||
        (handleRaceText() == "finalizada" && status == false) ? (
          ""
        ) : (
          <span
            style={{ backgroundColor: status ? "#000360" : "#00B69B" }}
            className={styles.tag}
          >
            {status ? "Chute Realizado" : "Aberto para chute"}
          </span>
        )}
      </div>

      {handleRaceText() == "finalizada" && !status ? (
        <button
          onClick={() => navigate(`./choice/${idRace}/0`)}
          className={styles.btnDisabled}
        >
          Finalizado - Ver Resultado
        </button>
      ) : (
        <button
          onClick={() => {
            if (status) {
              navigate(`./choice/${idRace}/${isExist[0].id_racing_bet}`);
            } else {
              navigate(`./choice/${idRace}/0`);
            }
          }}
          className={status ? styles.btnKicked : styles.btnKick}
        >
          {status
            ? handleRaceText() == "finalizada"
              ? "Ver resultado"
              : "Chute Realizado"
            : "Chutar"}
        </button>
      )}
    </div>
  );
}
