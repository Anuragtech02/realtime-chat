import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, ChatArea, Sidebar } from "./components";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthContextProvider from "./components/Contexts/AuthContext";
import GlobalContextProvider from "./components/Contexts/GlobalContext";
import SocketContextProvider from "./components/Contexts/SocketContextProvider";

const App = () => {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <SocketContextProvider>
          <Router>
            <div className={styles.container}>
              <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute
                  path="/:room"
                  exact
                  component={() => <WithSidebar component={ChatArea} />}
                />
                <PrivateRoute
                  path="/:room/chat/:name"
                  exact
                  component={() => <WithSidebar component={ChatArea} />}
                />
              </Switch>
            </div>
          </Router>
        </SocketContextProvider>
      </GlobalContextProvider>
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
