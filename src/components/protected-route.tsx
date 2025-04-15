import { Outlet, Navigate } from "react-router-dom";
import { GetCookie } from "../config/cookie";
import { CookiesEnum } from "../common/enum";

const ProtectedRoute = ({ roles }: { roles: string[] }) => {
  const accessToken = GetCookie(CookiesEnum.ACCESS_TOKEN);
  const loginUser = GetCookie(CookiesEnum.LOGIN_USER);

  if (!accessToken || !loginUser) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(loginUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
