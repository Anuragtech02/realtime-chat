import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, ChatArea, Sidebar } from "./components";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthContextProvider from "./components/Contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className={styles.container}>
          <Switch>
            <PrivateRoute
              path="/"
              exact
              component={() => <WithSidebar component={ChatArea} />}
            />
            <Route path="/login" exact component={Login} />
            <PrivateRoute
              path="/chat/:name"
              exact
              component={() => <WithSidebar component={ChatArea} />}
            />
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;

const WithSidebar = ({ component: Component }) => {
  return (
    <>
      <Sidebar />
      <Component />
    </>
  );
};
