import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Button } from "@material-ui/core";

const Login = () => {
  const [name, setName] = useState("");
  // const [name, setName] = useState("");

  return (
    <div className={styles.container}>
      <form>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
