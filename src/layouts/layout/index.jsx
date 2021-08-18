import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as styles from "./style.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const NonAuthLayout = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.navContainer}>
        <div className={styles.itemContainer}>
          <Logo
            style={{
              margin: "auto",
              width: "100%",
              maxWidth: "120px",
              maxHeight: "120px",
            }}
          />
        </div>
        <div className={styles.itemContainer}>
          <Link to={"/dashboard"}>dashboard</Link>
        </div>
        <div className={styles.itemContainer}>
          <Link to={"/order"}>orders</Link>
        </div>
        <div className={styles.itemContainer}>
          <Link to={"/logout"}>logout</Link>
        </div>
      </div>
      <div className={styles.mainContainer}>{props.children}</div>
    </div>
  );
};
export default withRouter(NonAuthLayout);
