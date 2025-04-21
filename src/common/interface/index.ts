import { PaymentEnum, UserGender, UserRole } from "../enum";

// login
export interface LoginT {
  username: string;
  password: string;
}

export interface TokenData {
  accessToken: string;
  access_token_expire: string;
  refreshToken: string;
  refresh_token_expire: string;
}

export interface UserT {
  full_name: string;
  username: string;
  password: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: TokenData;
  user: UserT;
}

// dashboard

interface Teacher {
  full_name: string;
  username: string;
  password: string;
  role: "TEACHER" | "ADMIN" | string;
  gender: "MALE" | "FEMALE" | string;
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface IncomeOrCost {
  sum: number;
  percent: number;
}

interface AgeStats {
  key: any;
  "10-13": number;
  "14-17": number;
  "18-25": number;
  "26-30": number;
  "30+": number;
}

interface TeachersResponseData {
  userCount: number;
  users: Teacher[];
  income: IncomeOrCost;
  cost: IncomeOrCost;
  studentCount: number;
  ageStats: AgeStats;
}

export interface ApiDashboard {
  status: number;
  message: string;
  data: TeachersResponseData;
}

// student get

export interface StudentResponse {
  status: number;
  message: string;
  data: Student[];
  meta: {
    studentCount: number;
  };
}

export interface ImageT {
  url: string;
}
export interface Student {
  full_name: string;
  username: string;
  password: string;
  role: "STUDENT";
  gender: "MALE" | "FEMALE";
  phone_number: string;
  address: string;
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  group_members: GroupMember[];
  images: ImageT[];
}

export interface GroupMember {
  group_members_id: string;
  group_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  group: Group;
}

export interface Group {
  name: string;
  group_id: string;
}

// pagination
export interface PaginationT {
  page: number;
  limit: number;
}

// student create form

export interface StudentFieldType {
  data_of_birth: string | Date;
  phone_number: string;
  sum: number;
  paymentType: PaymentEnum;
  address: string;
  password: string;
  username: string;
  full_name: string;
  img_url: string;
  groupId: string;
  gender: UserGender
}



// group get

export interface ResponseGroup {
  status: number;
  message: string;
  data: Group[];
  meta: Meta;
}

export interface Meta {
  totalCount: number;
  page: number;
  limit: number;
}

export interface Group {
  group_id: string;
  name: string;
  description: string;
  course_id: string;
  teacher_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  course: Course;
  teacher: User;
  group_members: GroupMember[];
}

export interface Course {
  course_id: string;
  name: string;
  description: string;
  duration: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  user_id: string;
  full_name: string;
  username: string;
  password: string;
  role: "TEACHER" | "STUDENT";
  address: string;
  phone_number: string;
  gender: "MALE" | "FEMALE";
  data_of_birth: string;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  group_members_id: string;
  group_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}


// dashboard
export interface DashboardT {
  fullname?: string | undefined;
  category?: string | undefined;
}