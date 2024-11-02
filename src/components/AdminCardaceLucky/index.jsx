import { useNavigate } from "react-router-dom";
import styles from "./adminCardRaceLuck.module.css";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";

AdminCardRaceLucky.propTypes = {
  idRace: PropTypes.number,
  date: PropTypes.string,
  city: PropTypes.string,
  flagCountry: PropTypes.string,
  round: PropTypes.number,
  circuitImg: PropTypes.string,
  isExist: PropTypes.array,
  result: PropTypes.string,
};

export default function AdminCardRaceLucky({
  idRace,
  date,
  city,
  flagCountry,
  round,
  circuitImg,
  isExist,
  result,
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

        {handleRaceText() === "cancelada" ||
        (handleRaceText() === "finalizada" && !status) ? (
          ""
        ) : ''}
      </div>

      <button
        onClick={() => {
          const targetBetId = status ? isExist[0].id_racing_bet : 0;
          const targetPath = `/admin/raceList/choice/${idRace}/${targetBetId}`;
          console.log(`Navigating to: ${targetPath}`);
          
          result == "" && handleRaceText() === "finalizada" && navigate(targetPath)
        }}
        className={result == "" && handleRaceText() === "finalizada" ? styles.btnKick :styles.btnKicked}
      >
        {/* {status
          ? handleRaceText() === "finalizada"
            ? "INDISPONIVEL"
            : "Realizar Chute"
          : "Ver resultado"} */}

        {handleRaceText() === "finalizada"
          ? result == "" ? 'Insira o resultado' : 'Veja o resultado'
          : 'Sem acesso'
        }
      </button>
    </div>
  );
}
