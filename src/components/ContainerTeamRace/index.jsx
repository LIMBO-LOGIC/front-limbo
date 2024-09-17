import { cloneElement } from "react";
import styles from "./containerTeamRace.module.css";
import { PropTypes } from "prop-types";

ContainerTeamRace.propTypes = {
  listItens: PropTypes.array,
  element: PropTypes.node,
};

export default function ContainerTeamRace({ listItens, element }) {
  return (
    <div className={styles.containerTeamRace}>
      {/* <TeamCard />
      <TeamCard />
      <TeamCard /> */}

      {listItens.map((item, index) => {
        return cloneElement(element, { key: index, item });
      })}
    </div>
  );
}
