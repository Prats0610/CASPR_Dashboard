import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addToast } from "../store/uiSlice";
import { UserProfile } from "../types";

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const initial: UserProfile = {
    name: user?.email ? user.email.split("@")[0] : "",
    email: user?.email ?? "",
    department: "Engineering",
    role: "Frontend Engineer",
  };

  const [form, setForm] = useState<UserProfile>(initial);

  const saveLocally = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      dispatch(
        addToast({ type: "error", message: "Name and Email are required" })
      );
      return;
    }
    dispatch(addToast({ type: "success", message: "Profile updated locally" }));
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-800 p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">My Profile</h2>
      <form onSubmit={saveLocally} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded dark:bg-slate-700 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded dark:bg-slate-700 dark:text-white"
            value={form.email}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
            Department
          </label>
          <input
            className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded dark:bg-slate-700 dark:text-white"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
            Role
          </label>
          <input
            className="w-full border border-slate-300 dark:border-slate-600 px-3 py-2 rounded dark:bg-slate-700 dark:text-white"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>

        <button
          type="button"
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
        >
          Save (local)
        </button>
      </form>
    </div>
  );
};

export default Profile;
