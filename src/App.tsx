import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));
const EmployeeDirectory = lazy(() => import("./pages/EmployeeDirectory"));
const LeaveRequests = lazy(() => import("./pages/LeaveRequests"));
const Profile = lazy(() => import("./pages/Profile"));
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import ToastContainer from "./components/ToastContainer";
import ThemeSync from "./components/ThemeSync";
import { listenToAuth } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listenToAuth());
  }, [dispatch]);
  return (
    <>
      <ThemeSync />
      <ToastContainer />
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="fixed inset-0 pointer-events-none flex items-start justify-end p-4">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border dark:border-slate-700 rounded-md shadow px-3 py-2">
                <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                <span>Loading…</span>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/employees" replace />} />
              <Route path="employees" element={<EmployeeDirectory />} />
              <Route path="leave-requests" element={<LeaveRequests />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/employees" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
