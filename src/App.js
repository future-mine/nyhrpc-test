import { BrowserRouter as Router, Switch } from "react-router-dom";
import NonAuthLayout from "./layouts/non-auth-layout";
import Layout from "./layouts/layout";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import AppRoute from "./routes/app-route";

function App() {
  return (
    <Router>
      <Switch>
        <AppRoute
          path={"/login"}
          layout={NonAuthLayout}
          component={Login}
          isAuthProtected={false}
        />

        <AppRoute
          path={"/dashboard"}
          layout={Layout}
          component={Dashboard}
          isAuthProtected={true}
        />
        <AppRoute
          path={"/order"}
          layout={Layout}
          component={Order}
          isAuthProtected={true}
        />
        <AppRoute
          path={"/logout"}
          layout={Layout}
          component={Logout}
          isAuthProtected={true}
        />
      </Switch>
    </Router>
  );
}
export default App;
