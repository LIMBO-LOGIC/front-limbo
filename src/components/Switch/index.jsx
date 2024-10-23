import React from "react";
import styles from "./switch.module.css";

const Switch = ({check}) => {
  return (
    <div>
      <div className="bauble_box">
        <input
          className="bauble_input"
          id="bauble_check"
          name="bauble"
          type="checkbox"
          checked={check}
        />
        <label className="bauble_label" htmlFor="bauble_check">
          Toggle
        </label>
      </div>
    </div>
  );
};



export default Switch;
