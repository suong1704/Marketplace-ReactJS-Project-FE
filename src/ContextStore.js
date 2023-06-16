import React, { useState, useEffect, useMemo } from "react";
import { getHeader } from "./services/helpers";
export const Context = React.createContext();

const baseUrl = process.env.REACT_APP_BASE_URL;
export const ContextStore = ({ children }) => {
  let initialValue = null;
  const [userData, setUserData] = useState(initialValue);

  useEffect(() => {
    fetch(`${baseUrl}/user/getUser`, {
      headers: getHeader(),
    })
      .then((res) => res.json())
      .then((res) => {
        return setUserData(res.user);
      });
  }, []);

  const providerValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
