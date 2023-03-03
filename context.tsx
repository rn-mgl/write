"use client";

import React from "react";

interface GlobalContext {
  url: string;
}

const AppContext = React.createContext<GlobalContext>({ url: "https://write-server.onrender.com" });

const AppProvider = ({ children }: { children: any }) => {
  const url = "https://write-server.onrender.com";

  return <AppContext.Provider value={{ url }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
