import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserStore from "../store/user-store";
import _ from "lodash";
const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const userStore = UserStore.getInstance();
  console.log("route authUser", userStore.authUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && _.isEmpty(userStore.authUser)) {
          return <Redirect to={{ pathname: "/login" }} />;
        }

        return (
          <Layout {...rest}>
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};
export default AppRoute;
