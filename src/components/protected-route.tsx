import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "../common/enum";
import { useAuthStore } from "../store/use-auth-store";

const ProtectedRoute = ({ roles }: { roles: string[] }) => {
  const { isLogged, token, user } = useAuthStore();

  if (!isLogged || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    if (UserRole.ADMIN === user.role) {
      return <Navigate to="/admin" replace />;
    } else if (UserRole.TEACHER === user.role) {
      return <Navigate to="/teacher" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
