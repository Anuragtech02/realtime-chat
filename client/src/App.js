import React from "react";
import styles from "./App.module.scss";
import ChatArea from "./components/ChatArea/ChatArea";
import Sidebar from "./components/Sidebar/Sidbear";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Router>
        <Switch>
          <Route path="/" component={ChatArea} />
          <Route path="/:name" component={ChatArea} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
