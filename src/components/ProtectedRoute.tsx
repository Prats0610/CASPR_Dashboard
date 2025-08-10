import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, initializing } = useSelector((state: RootState) => state.auth);

  if (!user && !initializing) return <Navigate to="/login" replace />;

  return (
    <>
      {children}
      {initializing && (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-end p-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border dark:border-slate-700 rounded-md shadow px-3 py-2">
            <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            <span>Loading…</span>
          </div>
        </div>
      )}
    </>
  );
}
