import { createContext, useState } from "react";

export const UserContext = createContext("");

export const UserProvider = (props) => {
  const [userDetail, setUserFun] = useState("");
  return (
    <UserContext.Provider value={{ userDetail, setUserFun }}>
      {props.children}
    </UserContext.Provider>
  );
};
