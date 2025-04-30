import React from "react";
import Login from "../components/login/login";
import ProtectedRoute from "../components/protected-route";
import { UserRole } from "../common/enum";
import { TeacherLayout } from "../module/teacher/teacher-layout";
import { AdminMainPage } from "../module/admin/pages/admin-main-page";
import { RouteSlash } from "../components/route-slash";
import { StudentPage } from "../module/admin/pages/student-page";
import { StudentCreate } from "../module/admin/pages/student-create";
import { CoursePage } from "../module/admin/pages/course-page";
import { CourseCreatePage } from "../module/admin/pages/course-create-page";
import { TeacherPage } from "../module/admin/pages/teacher-page";
import { TeacherCreate } from "../module/admin/pages/teacher-create";
import { GroupPage } from "../module/admin/pages/group-page";
import { GroupCreatePage } from "../module/admin/pages/group-create-page";
import { NotFoundPage } from "../components/not-found-page";
import { StudentDetail } from "../module/admin/pages/student-detail";
import { TeacherDetail } from "../module/admin/pages/teacher-detail";
import { GroupDetail } from "../module/admin/pages/group-detail";
import { CourseDetail } from "../module/admin/pages/course-detail";

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
    path: "/",
    element: <RouteSlash />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute roles={[UserRole.ADMIN]} />,
    children: [
      {
        index: true,
        element: <AdminMainPage />,
      },
      {
        path: "/admin/students",
        element: <StudentPage />,
      },
      {
        path: "/admin/student-create",
        element: <StudentCreate />,
      },
      {
        path: "/admin/courses",
        element: <CoursePage />,
      },
      {
        path: "/admin/course-create",
        element: <CourseCreatePage />,
      },
      {
        path: "/admin/teachers",
        element: <TeacherPage />,
      },
      {
        path: "/admin/teacher-create",
        element: <TeacherCreate />,
      },
      {
        path: "/admin/groups",
        element: <GroupPage />,
      },
      {
        path: "/admin/group-create",
        element: <GroupCreatePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/admin/student-detail/:id",
        element: <StudentDetail />,
      },
      {
        path: "/admin/teacher-detail/:id",
        element: <TeacherDetail />,
      },
      {
        path: "/admin/group-detail/:id",
        element: <GroupDetail />,
      },
      {
        path: '/admin/course-detail/:id',
        element: <CourseDetail />
      }
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
