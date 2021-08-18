import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import UserStore from "../../store/user-store";

const Logout = () => {
  const userStore = UserStore.getInstance();
  const history = useHistory();
  useEffect(() => {
    userStore.clearAuthUser();
    history.push("/login");
  }, []);

  return <div>Logging out...</div>;
};
export default withRouter(Logout);
