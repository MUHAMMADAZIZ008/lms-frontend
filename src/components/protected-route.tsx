import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "../common/enum";
import { useAuthStore } from "../store/use-auth-store";
import { AdminLayout } from "../module/admin/admin-layout";

const ProtectedRoute = ({ roles }: { roles: string[] }) => {
  const { isLogged, token, user } = useAuthStore();

  if (!isLogged || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.includes(user.role)) {
    if (UserRole.ADMIN === user.role) {
      return (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      );
    } else if (UserRole.TEACHER === user.role) {
      return <Navigate to="/teacher" replace />;
    }
  }
};

export default ProtectedRoute;
