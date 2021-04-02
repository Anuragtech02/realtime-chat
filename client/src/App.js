import React from "react";
import styles from "./App.module.scss";
import Sidebar from "./components/Sidebar/Sidbear";

const App = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default App;
