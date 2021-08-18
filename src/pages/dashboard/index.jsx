import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import AuthenticatedApiClient from "../../services/api-client";
import * as styles from "./style.module.css";
import _ from "lodash";
import { Bar } from "react-chartjs-2";
import Toggle from "../../components/toggle";
import UserStore from "../../store/user-store";

const apiClient = AuthenticatedApiClient.getInstance();
const Dashboard = () => {
  const userStore = UserStore.getInstance();
  const history = useHistory();
  const [salesWeek, setSalesWeek] = useState(null);
  const [salesYear, setSalesYear] = useState(null);
  const [bestSellors, setBestSellors] = useState([]);
  const [todaySale, setTodaySale] = useState({});
  const [weekSale, setWeekcale] = useState({});
  const [monthSale, setMonthSale] = useState({});
  const [chartData, setChartData] = useState(null);
  const [isWeekChart, setIsWeekChart] = useState(true);
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const kFormatter = (num) => {
    return Math.abs(num) > 9999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  useEffect(() => {
    getDashboard();
  }, []);
  useEffect(() => {
    let data = null;
    if (isWeekChart && salesWeek) {
      data = {
        labels: ["today", "yesterday", "day3", "day4", "day5", "day6"],
        datasets: [
          {
            label: "# of total",
            data: Object.values(salesWeek).map((v) => v.total),
            borderWidth: 1,
          },
        ],
      };
    } else if (!isWeekChart && salesYear) {
      data = {
        labels: [
          "this month",
          "last month",
          "month3",
          "month4",
          "month5",
          "month6",
          "month7",
          "month8",
          "month9",
          "month10",
          "month11",
          "month12",
        ],
        datasets: [
          {
            label: "# of total",
            data: Object.values(salesYear).map((v) => v.total),
            borderWidth: 1,
          },
        ],
      };
    }
    console.log("Chart data", data);
    setChartData(data);
  }, [isWeekChart, salesWeek, salesYear]);
  const getDashboard = async () => {
    try {
      const url = "https://freddy.codesubmit.io/dashboard";
      const { dashboard } = await apiClient.get(url);
      const salesTimeYear = dashboard.sales_over_time_year ?? null;
      const salesTimeWeek = dashboard.sales_over_time_week ?? null;
      console.log("salesTimeYear", salesTimeYear);
      console.log("salesTimeWeek", salesTimeWeek);
      setSalesYear(salesTimeYear);
      setSalesWeek(salesTimeWeek);
      setBestSellors(dashboard.bestsellers ?? []);
      const today = new Date();
      setTodaySale(salesTimeWeek[today.getDay()]);
      const weekTotal = _.sum(Object.values(salesTimeWeek).map((v) => v.total));
      const weekOrders = _.sum(
        Object.values(salesTimeWeek).map((v) => v.orders)
      );
      setWeekcale({ orders: weekOrders, total: weekTotal });
      setMonthSale(salesTimeYear[today.getMonth()]);
    } catch (err) {
      userStore.clearAuthUser();
      history.push("/login");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.headContainer}>
        <p>Dashboard</p>
      </div>
      <div className={styles.infoContainer}>
        <div>
          <p>Today</p>
          <p>{`$${todaySale.total ? kFormatter(todaySale.total) : 0}/${
            todaySale.orders ?? 0
          } orders`}</p>
        </div>
        <div>
          <p>Last week</p>
          <p>{`$${weekSale.total ? kFormatter(weekSale.total) : 0}/${
            weekSale.orders ?? 0
          } orders`}</p>
        </div>
        <div>
          <p>Last Month</p>
          <p>{`$${kFormatter(monthSale.total)}/${monthSale.orders} orders`}</p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.itemHeader}>
          <p>
            {isWeekChart ? `Revenue(last 7 days)` : "Revenue(last 12 months)"}
          </p>
        </div>
        <div className={styles.toggleContainer}>
          <Toggle value={isWeekChart} setValue={setIsWeekChart} />
        </div>
        <div>
          {chartData ? (
            <Bar data={chartData} options={options} />
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.sellorContainer}>
        <div className={styles.itemHeader}>
          <p>Bestsellers</p>
        </div>
        <div className={styles.tableContainer}>
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
