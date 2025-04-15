import React from "react";
import Login from "../components/login/login";
import ProtectedRoute from "../components/protected-route";
import { AdminLayout } from "../module/admin/admin-layout";
import { UserRole } from "../common/enum";
import { TeacherLayout } from "../module/teacher/teacher-layout";

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
    path: "/admin",
    element: <ProtectedRoute roles={[UserRole.ADMIN]} />,
    children: [
      {
        index: true,
        element: <AdminLayout />,
      },
    ],
  },

  {
    path: "/teacher",
    element: <ProtectedRoute roles={[UserRole.TEACHER]} />,
    children: [
      {
        index: true,
        element: <TeacherLayout />,
      },
    ],
  },

];
