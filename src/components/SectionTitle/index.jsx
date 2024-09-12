import { Link } from "react-router-dom";
import styles from "./sectionTitle.module.css";
import { PropTypes } from "prop-types";

SectionTitle.propTypes = {
  title: PropTypes.string,
  route: PropTypes.string,
};

export default function SectionTitle({ title, route }) {
  return (
    <div className={styles.sectionTitle}>
      <div className={styles.boxTitle}>
        <div className={styles.boxColor}></div>
        <p>{title}</p>
      </div>
      <Link className={styles.seeAll} to={route}>
        Ver todos
      </Link>
    </div>
  );
}
