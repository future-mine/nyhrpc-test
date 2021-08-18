import React, { useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import AuthenticatedApiClient from "../../services/api-client";
import UserStore from "../../store/user-store";
import "./style.css";

const apiClient = AuthenticatedApiClient.getInstance();
const userStore = UserStore.getInstance();
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const login = async () => {
    try {
      const url = "https://freddy.codesubmit.io/login";
      const { access_token, refresh_token } = await apiClient.post(url, {
        username,
        password,
      });
      userStore.setAuthUser({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      location.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header-container">
        <p style={{ fontSize: 24, width: "150px" }}>
          Freddy's Artisanal Halloween Candy Shop
        </p>
        <Logo style={{ width: "200px", height: "100px" }} />
      </div>
      <div className="main-container">
        <div className="row-container">
          <input
            value={username}
            type="text"
            placeholder={"username"}
            onChange={(e) => {
              setUserName(e.target.value ?? "");
            }}
          />
        </div>
        <div className="row-container">
          <input
            value={password}
            type="password"
            placeholder={"password"}
            onChange={(e) => {
              setPassword(e.target.value ?? "");
            }}
          />
        </div>
        <div className="row-container">
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);
