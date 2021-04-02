import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUSer] = useState({});

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUSer }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
