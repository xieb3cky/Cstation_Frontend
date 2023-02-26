import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** This component will check if there is a valid current user and only continues to the
 * route if so. If no user is present, Navigates to homepage "/".
 */

function PrivateRoute({ children }) {

  const { currUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "currentUser=", currUser,
  );

  if (!currUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
