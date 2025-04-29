import {
  CourseStatus,
  GroupStatus,
  PaymentEnum,
  UserGender,
  UserRole,
} from "../enum";

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
  role: UserRole;
  gender: UserGender;
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
export interface StudentPaymentT {
  payment_id: string;
  type: string;
  sum: string;
  created_at: string;
  updated_at: string;
  student_id: string;
  group_id: string;
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
  PaymentForStudent: StudentPaymentT[];
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
  sum?: number;
  paymentType?: PaymentEnum;
  address: string;
  password: string;
  username: string;
  full_name: string;
  img_url: string;
  groupId?: string;
  gender: UserGender;
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
  status: GroupStatus;
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
  role: UserRole;
  address: string;
  phone_number: string;
  gender: UserGender;
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

// course create form
export interface CourseTypeForm {
  name: string;
  description: string;
  duration: number;
  status: CourseStatus;
}

// axios error
interface ValidationErrorResponse {
  statusCode: number; // 422
  error: string; // "Unprocessable Entity"
  message: string[]; // ['duration must not be less than 1', 'duration must be an integer number']
}

export interface AxiosErrorResponse {
  message: string; // "Request failed with status code 422"
  name: string; // "AxiosError"
  code: string; // "ERR_BAD_REQUEST"
  config: any;
  request: XMLHttpRequest;
  response: {
    status: number; // 422
    statusText: string; // "Unprocessable Entity"
    headers: Record<string, string>;
    config: any;
    data: ValidationErrorResponse;
  };
  stack?: string;
}
// course request

export interface CourseResponse {
  data: Course[];
  meta: {
    page: number;
    pages: number;
    limit: number;
    total: number;
  };
}

// teacher response

// teacher payment
export interface TeacherPaymentType {
  type: PaymentEnum;
  sum: number;
  teacher_id: string;
}

export interface TeacherT {
  user_id: string;
  full_name: string;
  username: string;
  password: string;
  role: UserRole;
  address: string;
  phone_number: string;
  gender: UserGender;
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  images: ImageT[];
  PaymentForTeacher: TeacherPaymentType;
  groups: Group[];
}

export interface TeacherResponse {
  status: number;
  message: string;
  data: TeacherT[];
  meta: {
    teacherCount: number;
  };
}

export interface TeacherFieldType {
  data_of_birth: string | Date;
  phone_number: string;
  address: string;
  password: string;
  username: string;
  full_name: string;
  img_url: string;
  gender: UserGender;
}

// group response

// === GroupMember ===
export interface GroupMember {
  group_members_id: string;
  group_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: User;
}

// === Group ===
export interface Group {
  group_id: string;
  name: string;
  description: string;
  course_id: string;
  teacher_id: string;
  status: GroupStatus;
  created_at: string;
  updated_at: string;
  start_date: string;
  course: Course;
  teacher: User;
  group_members: GroupMember[];
}

// === Meta ===
export interface Meta {
  totalCount: number;
  page: number;
  limit: number;
}

// === ApiResponse ===
export interface GroupApiResponse {
  status: number;
  message: string;
  data: Group[];
  meta: Meta;
}

// group create form type
export interface GroupTypeForm {
  name: string;
  description: string;
  status: GroupStatus;
  teacher_id: string;
  course_id: string;
  start_date: string;
}

export interface SelectOptionT {
  value: string;
  label: string;
}

export interface filterOptionForStudent {
  date_of_birth?: string;
  gender?: UserGender;
  group_id?: string;
  isSaved?: boolean;
  fullname?: string;
}
export interface filterOptionForTeacher {
  date_of_birth?: string;
  gender?: UserGender;
  isSaved?: boolean;
  full_name?: string;
}

export interface filterOptionForGroup {
  start_date?: string;
  status?: GroupStatus;
  isSaved?: boolean;
  name?: string;
}

export interface filterOptionForCourse {
  status?: CourseStatus;
  name?: string;
}

// one student

export interface OneStudentResponse {
  status: string;
  message: string;
  data: Student;
}

// one teacher
export interface OneTeacherResponse {
  status: string;
  message: string;
  data: TeacherT;
}

// one group
export interface OneGroupResponse {
  status: string;
  message: string;
  data: Group;
}

// payment form type

export interface StudentPaymentFormType {
  type: PaymentEnum;
  sum: number;
  student_id: string;
  group_id: string;
}

export interface TeacherPaymentFormType {
  type: PaymentEnum;
  sum: number;
  teacher_id: string;
}
