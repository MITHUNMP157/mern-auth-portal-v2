import { Navigate, useNavigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
