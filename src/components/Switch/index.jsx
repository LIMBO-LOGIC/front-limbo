/* eslint-disable react/prop-types */
import styles from "./switch.module.css";

const Switch = ({check, onclick}) => {
  return (
    <div onClick={onclick}>
      <label className={`${styles.switch}`}>
        <input type="checkbox" checked={check} />
        <span className={`${styles.slider}`} />
      </label>
    </div>
  );
};



export default Switch;
