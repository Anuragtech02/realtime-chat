import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

const ENDPOINT = "localhost:5000";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState();
  const [roomData, setRoomData] = useState();
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const { name, room } = currentUser;
    console.log("Hello");
    const newSocket = io.connect();
    setSocket(newSocket);
    return () => newSocket.close();
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ data, socket, roomData, setRoomData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
