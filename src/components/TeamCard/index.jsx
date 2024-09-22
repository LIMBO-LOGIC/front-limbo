import styles from "./teamCard.module.css";
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
    <div style={{ color: color }} className={styles.dataBox}>
      <div className={styles.boxTitle}>
        {icon}
        <p className={styles.boxName}>{name}</p>
      </div>
      <p className={styles.boxValue}>{value}</p>
    </div>
  );
}

TeamCard.propTypes = {
  item: PropTypes.object,
};

export default function TeamCard({ item }) {
  const styleImg = {
    'backgroundColor': item.colorMain,
  };

  return (
    <div className={styles.teamCard}>
      <p className={styles.cardTitle}>{item.name}</p>
      <div style={styleImg} className={styles.boxImgCar}>
        <img src={`/assets/${item.imageCar}`} alt="Image car" />
      </div>
      <div className={styles.dataTeam}>
        <DataTeam color={item.colorMain} icon={<IoTrophyOutline />} name={"Wins"} value={item.wins} />
        <DataTeam color={item.colorMain} icon={<IoPodiumOutline />} name={"Podiums"} value={item.podiums} />
        <DataTeam color={item.colorMain}
          icon={
            <div className={styles.flags}>
              <FaFlagCheckered className={styles.flagOne} />
              <FaFlagCheckered className={styles.flagTwo} />
            </div>
          }
          name={"Races"}
          value={item.races}
        />
      </div>
      <div className={styles.boxPilots}>
        <p className={styles.pilotText}><span style={{ color: item.colorMain, fontWeight: 600 }}>{item.pilots[0].number}</span> {item.pilots[0].name} <strong>{item.pilots[0].lastName} </strong></p>
        <p className={styles.pilotText}><span style={{ color: item.colorMain, fontWeight: 600 }}>{item.pilots[1].number}</span> {item.pilots[1].name} <strong>{item.pilots[1].lastName} </strong></p>
      </div>
    </div>
  );
}


// export default function TeamCard({ name, colorMain, wins, podiums, races, pilots }) {
//   const styleImg = {
//     'backgroundColor': "#194997",
//   };

//   return (
//     <div className={styles.teamCard}>
//       <p className={styles.cardTitle}>ABT CUPRA Formula E Team</p>
//       <div style={styleImg} className={styles.boxImgCar}>
//         <img src={car} alt="Image car" />
//       </div>
//       <div className={styles.dataTeam}>
//         <DataTeam color={'#194997'} icon={<IoTrophyOutline />} name={"Wins"} value={"14"} />
//         <DataTeam color={'#194997'} icon={<IoPodiumOutline />} name={"Podiums"} value={"47"} />
//         <DataTeam color={'#194997'}
//           icon={
//             <div className={styles.flags}>
//               <FaFlagCheckered className={styles.flagOne} />
//               <FaFlagCheckered className={styles.flagTwo} />
//             </div>
//           }
//           name={"Races"}
//           value={"115"}
//         />
//       </div>
//       <div className={styles.boxPilots}>
//         <p className={styles.pilotText}><span style={{ color: '#194997', fontWeight: 600 }}>11</span> Lucas <strong>Di Grasse</strong></p>
//         <p className={styles.pilotText}><span style={{ color: '#194997', fontWeight: 600 }}>11</span> Lucas <strong>Di Grasse</strong></p>
//       </div>
//     </div>
//   );
// }
