import React from "react";
import Login from "../components/login/login";
import ProtectedRoute from "../components/protected-route";
import { AdminLayout } from "../module/admin/admin-layout";

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
      },
    ],
  },
];
