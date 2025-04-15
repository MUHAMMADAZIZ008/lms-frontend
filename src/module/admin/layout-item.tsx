import { GroupIcon } from "../../assets/components/group-icon";
import { MainIcon } from "../../assets/components/main-icon";
import { StudentIcon } from "../../assets/components/student-icon";
import { TeacherIcon } from "../../assets/components/teacher-icon";

export const layoutItem = [
  {
    path: "/admin",
    icon: MainIcon,
    title: "Asosiy",
  },
  {
    path: "/admin/students",
    icon: StudentIcon,
    title: "O’quvchilar",
  },
  {
    path: "/admin/teachers",
    icon: TeacherIcon,
    title: "O’qituvchilar",
  },
  {
    icon: GroupIcon,
    title: "Bo'limlar",
    children: [
      {
        path: "/admin/groups",
        title: "Guruhlar",
      },
      {
        path: "/admin/courses",
        title: "Kurslar",
      },
    ],
  },
];
