import React from "react";
import * as styles from "./style.module.css";
const Toggle = ({ value, setValue }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        value={value}
        onChange={() => {
          setValue(!value);
        }}
      />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};
export default Toggle;
