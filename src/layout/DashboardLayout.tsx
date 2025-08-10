import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUser } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div className="flex min-h-screen dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar />
      <div className="flex-1 p-4">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome{user?.email ? `, ${user.email}` : ""}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage employees and leaves
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-1 border rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button
              onClick={() => dispatch(logoutUser())}
              className="px-3 py-1 border rounded-md bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Sign out
            </button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
