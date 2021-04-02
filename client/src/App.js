import React from "react";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, ChatArea, Sidebar } from "./components";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={ChatArea} />
          <Route path="/login" exact component={Login} />
          <Route path="/:name" component={ChatArea} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
