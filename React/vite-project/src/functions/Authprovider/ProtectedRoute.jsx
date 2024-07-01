/*eslint-disable*/
import { useContext } from "react";
import AuthContext from "./authprovider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  if (!user) {
    console.log("No User Authenticated");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
