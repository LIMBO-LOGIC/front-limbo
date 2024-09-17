import { PropTypes } from "prop-types";
import styles from "./pagetitle.module.css";

export default function PageTitle({ text }) {
  return <h1 className={styles.title}>{text}</h1>;
}

PageTitle.propTypes = {
  text: PropTypes.string,
};
