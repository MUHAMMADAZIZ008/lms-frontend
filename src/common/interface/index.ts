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
