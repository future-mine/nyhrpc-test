import React from "react";
import { withRouter } from "react-router-dom";
import * as styles from "./style.module.css";
const Order = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p>Orders</p>
        <input />
      </div>
      <div className={styles.tableContainer}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>shipped</td>
            </tr>
            <tr>
              <td>Item1</td>
              <td>Item1</td>
              <td>Item1</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p>Page 1 of 3</p>
      </div>
    </div>
  );
};
export default withRouter(Order);
