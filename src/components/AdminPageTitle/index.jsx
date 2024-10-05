import { PropTypes } from "prop-types";
import styles from "./adminPageTitle.module.css";

export default function AdminPageTitle({ text }) {
  return <h1 className={styles.title}>{text}</h1>;
}

AdminPageTitle.propTypes = {
  text: PropTypes.string,
};
