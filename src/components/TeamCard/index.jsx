import styles from "./teamCard.module.css";
import car from "../../assets/carCupra.svg";
import { IoPodiumOutline, IoTrophyOutline } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";
import { PropTypes } from "prop-types";

DataTeam.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string
};
function DataTeam({ icon, name, value, color }) {
  return (
    <div style={{color: color}} className={styles.dataBox}>
      <div className={styles.boxTitle}>
        {icon}
        <p className={styles.boxName}>{name}</p>
      </div>
      <p className={styles.boxValue}>{value}</p>
    </div>
  );
}

export default function TeamCard() {
  const styleImg = {
    'backgroundColor': "#194997",
  };

  return (
    <div className={styles.teamCard}>
      <p className={styles.cardTitle}>ABT CUPRA Formula E Team</p>
      <div style={styleImg} className={styles.boxImgCar}>
        <img src={car} alt="Image car" />
      </div>
      <div className={styles.dataTeam}>
        <DataTeam color={'#194997'} icon={<IoTrophyOutline />} name={"Wins"} value={"14"} />
        <DataTeam color={'#194997'} icon={<IoPodiumOutline />} name={"Podiums"} value={"47"} />
        <DataTeam color={'#194997'}
          icon={
            <div className={styles.flags}>
              <FaFlagCheckered className={styles.flagOne} />
              <FaFlagCheckered className={styles.flagTwo}/>
            </div>
          }
          name={"Races"}
          value={"115"}
        />
      </div>
      <div className={styles.boxPilots}>
        <p className={styles.pilotText}><span style={{color: '#194997', fontWeight: 600}}>11</span> Lucas <strong>Di Grasse</strong></p>
        <p className={styles.pilotText}><span style={{color: '#194997', fontWeight: 600}}>11</span> Lucas <strong>Di Grasse</strong></p>
      </div>
    </div>
  );
}
