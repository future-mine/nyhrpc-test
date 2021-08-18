import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AuthenticatedApiClient from "../../services/api-client";
import * as styles from "./style.module.css";

const apiClient = AuthenticatedApiClient.getInstance();
const Dashboard = () => {
  const [salesWeek, setSalesWeek] = useState([]);
  const [salesYear, setSalesYear] = useState([]);
  const [bestSellors, setBestSellors] = useState([]);
  useEffect(() => {
    getDashboard();
  }, []);
  const getDashboard = async () => {
    const url = "https://freddy.codesubmit.io/dashboard";
    const { dashboard } = await apiClient.get(url);
    setSalesYear(dashboard.sales_over_time_year ?? []);
    setSalesWeek(dashboard.sales_over_time_week ?? []);
    setBestSellors(dashboard.bestsellers ?? []);
  };
  return (
    <div className={styles.root}>
      <div className={styles.headContainer}>
        <p>Dashboard</p>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <p>Today</p>
          <p>$1456/9 orders</p>
        </div>
        <div>
          <p>Last week</p>
          <p>$34K/120 orders</p>
        </div>
        <div>
          <p>Last Month</p>
          <p>$95K/876 orders</p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.itemHeader}>
          <p>Revenu(last 7 days)</p>
        </div>
        <div>chart</div>
      </div>
      <div className={styles.sellorContainer}>
        <div className={styles.itemHeader}>
          <p>Bestsellers</p>
        </div>
        <div>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>#Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {bestSellors.map((sellor, index) => (
                <tr key={index}>
                  <td>{sellor.product.name}</td>
                  <td>#</td>
                  <td>{sellor.units}</td>
                  <td>{sellor.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Dashboard);
