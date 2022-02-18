import React from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { state } from "../../state";

export const Logout = () => {
  const [currentUser, setCurrentUser] = useAtom(state.currentUser);

  setCurrentUser(null);

  return <Navigate to="/"></Navigate>;
};

// const logoutEvent = async (e) => {
//   e.preventDefault();
//   const response = await dataHandler.postLogout();

//   typeof response !== "undefined" && response.status === 200
//     ? history.go(0)
//     : history.push(location);
// };
