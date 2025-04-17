import React from "react";
import Login from "../components/login/login";
import ProtectedRoute from "../components/protected-route";
import { UserRole } from "../common/enum";
import { TeacherLayout } from "../module/teacher/teacher-layout";
import { AdminMainPage } from "../module/admin/components/admin-main-page";
import { RouteSlash } from "../components/route-slash";

interface RouteT {
  path?: string;
  element: React.ReactNode;
  children?: ChildrenT[];
}
interface ChildrenT {
  index?: boolean;
  path?: string;
  element: React.ReactNode;
  nestedChildren?: NestedChildrenT;
}

interface NestedChildrenT {
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
    path: '/',
    element: <RouteSlash />
  },
  {
    path: "/admin",
    element: <ProtectedRoute roles={[UserRole.ADMIN]}/>,
    children: [
      {
        index: true,
        element: <AdminMainPage />,
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
