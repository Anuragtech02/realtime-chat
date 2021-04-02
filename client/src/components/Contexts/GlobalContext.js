import React, { createContext } from "react";

export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
