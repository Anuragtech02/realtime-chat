import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:5000";

export const SocketContext = createContext({});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  //room id and users in room
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const newSocket = io.connect();
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomData, setRoomData }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
