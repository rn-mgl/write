"use client";

import React from "react";

interface GlobalContext {
  url: string;
}

const AppContext = React.createContext<GlobalContext>({ url: "http://192.168.1.121:9000" });

const AppProvider = ({ children }: { children: any }) => {
  const url = "http://192.168.1.121:9000";

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
