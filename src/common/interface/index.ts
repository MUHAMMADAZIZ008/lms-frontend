import { UserRole } from "../enum";

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
  teacherCount: number;
  teachers: Teacher[];
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

export interface Student {
  full_name: string;
  username: string;
  password: string;
  role: "STUDENT";
  gender: "MALE" | "FEMALE";
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  group_members: GroupMember[];
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