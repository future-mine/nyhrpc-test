import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import AuthenticatedApiClient from "../../services/api-client";
import UserStore from "../../store/user-store";
import * as styles from "./style.module.css";
const apiClient = AuthenticatedApiClient.getInstance();
const Order = () => {
  const userStore = UserStore.getInstance();
  const history = useHistory();
  const [searchItem, setSearchItem] = useState("");
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    getOrders();
  }, [searchItem, page]);
  const getOrders = async () => {
    try {
      const url = `https://freddy.codesubmit.io/orders?page=${page}&q=${searchItem}`;
      const res = await apiClient.get(url);
      setOrders(res.orders);
      const totalNum = Math.ceil(res.total / 50.0);
      setTotalPage(totalNum > 0 ? totalNum : 1);
      if (res.orders.length === 0) {
        setPage(totalNum > 0 ? totalNum : 1);
      } else {
        setPage(res.page > 0 ? res.page : 1);
      }
    } catch (err) {
      console.log(err.code);
      userStore.clearAuthUser();
      history.push("/login");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p>Orders</p>
        <input
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value ?? "");
          }}
        />
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
            {orders.map((order) => (
              <tr>
                <td>{order.product.name}</td>
                <td>{new Date(order.created_at).toDateString()}</td>
                <td>{`${order.currency}${order.total}`}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationContainer}>
        <div
          style={{ cursor: "pointer", margin: "5px" }}
          onClick={() => {
            setPage(page - 1 < 1 ? 1 : page - 1);
          }}
        >
          ◀
        </div>
        <p>{`Page ${page} of ${totalPage}`}</p>
        <div
          style={{ cursor: "pointer", margin: "5px" }}
          onClick={() => {
            setPage(page + 1 > totalPage ? totalPage : page + 1);
          }}
        >
          ▶
        </div>
      </div>
    </div>
  );
};
export default withRouter(Order);
