import React, { createContext, useState } from "react";

export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
