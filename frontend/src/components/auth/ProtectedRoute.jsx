import { Navigate, useLocation } from "react-router-dom";

const getUserRole = () => {
  try {
    return localStorage.getItem("nexlib_role") || "guest";
  } catch {
    return "guest";
  }
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const role = getUserRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
