import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

//Socket declarations
let socket;
const ENDPOINT = "http://localhost:5000/";

export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const { name, room } = currentUser;
    socket = io.connect(ENDPOINT, {
      reconnection: false,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
    });
    if (name?.length && room?.length) {
      socket.emit("join", { name, room });
      console.log("yes");
    }
  }, [currentUser]);

  return (
    <GlobalContext.Provider value={{ data }}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
