import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addToast } from "../store/uiSlice";
import { Employee } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, "id">) => void;
}

export default function AddEmployeeModal({ isOpen, onClose, onSave }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<Omit<Employee, "id">>({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  if (!isOpen) return null;

  const handleSave = () => {
    if (!form.name || !form.email) {
      dispatch(
        addToast({ type: "error", message: "Name & Email are required" })
      );
      return;
    }
    onSave(form);
    setForm({
      name: "",
      email: "",
      department: "",
      role: "",
      status: "Active",
    });
    onClose();
    dispatch(addToast({ type: "success", message: "Employee added" }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add Employee</h2>

        <div className="space-y-3">
          {["name", "email", "department", "role"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full border px-3 py-2 rounded dark:bg-slate-700 dark:border-slate-600"
            />
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
