import { GroupIcon } from "../../assets/components/group-icon";
import { MainIcon } from "../../assets/components/main-icon";
import { StudentIcon } from "../../assets/components/student-icon";
import { TeacherIcon } from "../../assets/components/teacher-icon";

export const layoutItem = [
  {
    path: "/",
    icon: MainIcon,
    title: "Asosiy",
  },
  {
    path: "/students",
    icon: StudentIcon,
    title: "O’quvchilar",
  },
  {
    path: "/teachers",
    icon: TeacherIcon,
    title: "O’qituvchilar",
  },
  {
    icon: GroupIcon,
    title: "Bo'limlar",
    children: [
      {
        path: "/groups",
        title: "Guruhlar",
      },
      {
        path: "/courses",
        title: "Kurslar",
      },
    ],
  },
];
