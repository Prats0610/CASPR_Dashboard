import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { createLeaveRequest } from "../store/leaveRequestsSlice";
import { addToast } from "../store/uiSlice";

interface Props {
  onClose: () => void;
}

const AddLeaveModal: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.employees.list);

  const [employeeId, setEmployeeId] = useState<string | number | "">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [leaveType, setLeaveType] = useState("");

  const handleSubmit = () => {
    if (!employeeId || !from || !to || !leaveType) {
      dispatch(addToast({ type: "error", message: "Please fill all fields" }));
      return;
    }

    const selectedEmployee = employees.find(
      (emp) => String(emp.id) === String(employeeId)
    );

    if (!selectedEmployee) {
      dispatch(addToast({ type: "error", message: "Invalid employee" }));
      return;
    }

    dispatch(
      createLeaveRequest({
        employeeId: selectedEmployee.id,
        employee: selectedEmployee.name,
        from,
        to,
        leaveType,
        status: "Pending",
      })
    );

    onClose();
    dispatch(addToast({ type: "success", message: "Leave request added" }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Add New Leave
        </h2>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded mb-3 dark:bg-slate-700 dark:text-white"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded mb-3 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded mb-3 dark:bg-slate-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Leave Type"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded mb-3 dark:bg-slate-700 dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveModal;
