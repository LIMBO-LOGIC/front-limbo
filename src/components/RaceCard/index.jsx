import styles from "./raceCard.module.css";
import { PropTypes } from "prop-types";

RaceCard.propTypes = {
  item: PropTypes.object,
};

export default function RaceCard({ item }) {
  const dicMes = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  };

  const getDatePT = (data) => {
    // eslint-disable-next-line no-unused-vars
    const [ano, mes, dia] = data.split("-");
    return `${dia} de ${dicMes[mes]}`;
  };

  return (
    <div className={styles.raceCard}>
      <div className={styles.raceBox}>
        <p className={styles.titleBox}> {getDatePT(item.date)}</p>
        <div className={styles.dataRace}>
          <div className={styles.textBox}>
            <p>{item.thirstEN}</p>
            <img src={`https://res.cloudinary.com/drwk6ohcn/image/upload/v1727012409/Flags/flag_${item.flagCountry}.png`} alt="Bandeira do país do circuito" />
          </div>
          <div className={styles.line}></div>
          <p>Round {item.round}</p>
        </div>
      </div>
      <img className={styles.circuit} src={`https://res.cloudinary.com/drwk6ohcn/image/upload/v1726973298/Circuits/${item.circuit[2].url}.png`} alt="circuito de corrida" />
    </div>
  );
}
