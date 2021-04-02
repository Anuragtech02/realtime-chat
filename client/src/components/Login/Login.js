import React, { useState, useContext, useEffect } from "react";
import styles from "./Login.module.scss";
import { Button, CircularProgress } from "@material-ui/core";
import { AuthContext } from "../Contexts/AuthContext";
import { withRouter } from "react-router-dom";

const Login = ({ history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState("");

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.name && !loading) history.push("/");
  }, [currentUser, history, loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name?.trim().length) {
      alert("Please enter valid name");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setCurrentUser({ name });
      setLoading(false);
    }, 1000);
    // history.push("/");
  };

  return (
    <div className={styles.container}>
      <h4>Realtime Chat</h4>
      <form onSubmit={onSubmit}>
        <p>Please Enter Following Details</p>
        <input
          value={name}
          type="text"
          disabled={loading}
          required
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button className={styles.submitBtn} variant="default" type="submit">
          Submit
        </Button>
        <div
          className={styles.loading}
          style={{ visibility: loading ? "visible" : "hidden" }}
        >
          <CircularProgress />
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
