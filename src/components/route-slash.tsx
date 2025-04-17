import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/use-auth-store";
import { UserRole } from "../common/enum";

export const RouteSlash = () => {
  const { isLogged, token, user } = useAuthStore();

  if (!isLogged || !token || !user) {
    return <Navigate to="/login" replace />;
  }
  if (token && user && isLogged) {
    if (user.role === UserRole.ADMIN) {
      return <Navigate to="/admin" replace />;
    } else if (user.role === UserRole.TEACHER) {
      return <Navigate to="/teacher" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
  return <div></div>;
};
