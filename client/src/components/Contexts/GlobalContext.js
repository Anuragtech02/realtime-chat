import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

const ENDPOINT = "http://localhost:5000";

export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState();
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // const { name, room } = currentUser;
    // const newSocket = io(ENDPOINT);
    // setSocket(newSocket);
    // return () => newSocket.close();
  }, [currentUser]);

  return (
    <GlobalContext.Provider value={{ data, socket }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
