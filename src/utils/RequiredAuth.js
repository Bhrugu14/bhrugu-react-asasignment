import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children, path, user }) => {
  if (path === "auth") {
    if (typeof user !== "string") {
      return <Navigate to="/productList" replace />;
    } else {
      return children;
    }
  } else {
    if (typeof user !== "string") {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
};
