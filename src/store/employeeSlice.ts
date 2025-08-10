import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../types";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/api";

interface EmployeesState {
  list: Employee[];
  loading: boolean;
}

const initialState: EmployeesState = {
  list: [],
  loading: false,
};

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const res = await getEmployees();
  return res.data;
});

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employee: Omit<Employee, "id">, { dispatch }) => {
    await addEmployee(employee);
    dispatch(fetchEmployees());
  }
);

export const editEmployee = createAsyncThunk(
  "employees/edit",
  async (
    { id, data }: { id: string | number; data: Partial<Employee> },
    { dispatch }
  ) => {
    await updateEmployee(id, data);
    dispatch(fetchEmployees());
  }
);

export const removeEmployee = createAsyncThunk(
  "employees/remove",
  async (id: string | number, { dispatch }) => {
    await deleteEmployee(id);
    dispatch(fetchEmployees());
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default employeesSlice.reducer;
