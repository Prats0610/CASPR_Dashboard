import axios from "axios";
import { Employee, LeaveRequest } from "../types";

const API_URL = "http://localhost:5000";

// Employees
export const getEmployees = () => axios.get<Employee[]>(`${API_URL}/employees`);
export const addEmployee = (employee: Omit<Employee, "id">) =>
  axios.post<Employee>(`${API_URL}/employees`, employee);
export const updateEmployee = (id: string | number, data: Partial<Employee>) =>
  axios.patch<Employee>(`${API_URL}/employees/${id}`, data);
export const deleteEmployee = (id: string | number) =>
  axios.delete(`${API_URL}/employees/${id}`);

// Leave Requests
export const getLeaveRequests = () =>
  axios.get<LeaveRequest[]>(`${API_URL}/leaveRequests`);
export const addLeaveRequest = (leave: Omit<LeaveRequest, "id">) =>
  axios.post<LeaveRequest>(`${API_URL}/leaveRequests`, leave);
export const updateLeaveRequest = (
  id: string | number,
  data: Partial<LeaveRequest>
) => axios.patch<LeaveRequest>(`${API_URL}/leaveRequests/${id}`, data);
export const deleteLeaveRequest = (id: string | number) =>
  axios.delete(`${API_URL}/leaveRequests/${id}`);
