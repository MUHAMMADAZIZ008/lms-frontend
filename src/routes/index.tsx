import React from "react";
import Login from "../components/login/login";
import ProtectedRoute from "../components/protected-route";
import { AdminLayout } from "../module/admin/admin-layout";
import { UserRole } from "../common/enum";

interface RouteT {
  path?: string;
  element: React.ReactNode;
  children?: ChildrenT[];
}
interface ChildrenT {
  index?: boolean;
  path?: string;
  element: React.ReactNode;
}

export const routes: RouteT[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute roles={[UserRole.ADMIN]}/>,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
      },
    ],
  },
];
