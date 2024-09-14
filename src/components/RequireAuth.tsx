import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
  const { user } = useAuth();
  const location = useLocation();
  const hasAccess = allowedRoles.includes(user?.role);
  console.log(user?.role, allowedRoles);
  
  if (hasAccess) {
    return <Outlet />;
  } else if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
