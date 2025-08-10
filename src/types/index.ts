export interface Employee {
  id: string | number;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
}

export interface LeaveRequest {
  id: string | number;
  employeeId: string | number;
  employee: string;
  leaveType: string;
  from: string;
  to: string;
  status: string;
}

export interface UserProfile {
  name: string;
  email: string;
  department: string;
  role: string;
}
