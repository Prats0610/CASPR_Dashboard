import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LeaveRequest } from "../types";
import {
  getLeaveRequests,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
} from "../services/api";

interface LeaveRequestsState {
  list: LeaveRequest[];
  loading: boolean;
}

const initialState: LeaveRequestsState = {
  list: [],
  loading: false,
};

export const fetchLeaveRequests = createAsyncThunk(
  "leaveRequests/fetch",
  async () => {
    const res = await getLeaveRequests();
    return res.data;
  }
);

export const createLeaveRequest = createAsyncThunk(
  "leaveRequests/create",
  async (
    leave: Omit<LeaveRequest, "id">,
    { dispatch, getState, rejectWithValue }
  ) => {
    const state: any = getState();
    const employees = state.employees.list;
    const employeeExists = employees.some(
      (emp: any) => emp.name.toLowerCase() === leave.employee.toLowerCase()
    );

    if (!employeeExists) {
      return rejectWithValue("Employee not found in directory");
    }

    await addLeaveRequest(leave);
    dispatch(fetchLeaveRequests());
  }
);

export const editLeaveRequest = createAsyncThunk(
  "leaveRequests/edit",
  async (
    { id, data }: { id: string | number; data: Partial<LeaveRequest> },
    { dispatch }
  ) => {
    await updateLeaveRequest(id, data);
    dispatch(fetchLeaveRequests());
  }
);

export const removeLeaveRequest = createAsyncThunk(
  "leaveRequests/remove",
  async (id: string | number, { dispatch }) => {
    await deleteLeaveRequest(id);
    dispatch(fetchLeaveRequests());
  }
);

const leaveRequestsSlice = createSlice({
  name: "leaveRequests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchLeaveRequests.fulfilled,
        (state, action: PayloadAction<LeaveRequest[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchLeaveRequests.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createLeaveRequest.rejected, (_, action) => {
        console.error(action.payload || "Failed to add leave request");
      });
  },
});

export default leaveRequestsSlice.reducer;
