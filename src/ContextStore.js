import React, { useState, useEffect, useMemo } from "react";
import { TOKEN, getLocalStorage, setLocalStorage } from "./services/helpers";
// import { useCookies } from 'react-cookie'
export const Context = React.createContext();

const baseUrl = process.env.REACT_APP_BASE_URL;
export const ContextStore = ({ children }) => {
  let initialValue = null;
  // const [cookies, setCookie, removeCookie] = useCookies(['USER_SESSION']);
  const [userData, setUserData] = useState(initialValue);

  useEffect(() => {
    //if (cookies.USER_SESSION) {
    fetch(`${baseUrl}/user/getUser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalStorage(TOKEN)}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return setUserData(res.user);
      });
    //}
  }, []);

  // console.log(userData)
  const providerValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
