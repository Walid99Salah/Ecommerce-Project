import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [successResetCode, setSuccessResetCode] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, successResetCode , setSuccessResetCode }}>
      {children}
    </UserContext.Provider>
  );
}
