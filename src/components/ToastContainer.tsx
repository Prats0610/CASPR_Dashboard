import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeToast } from "../store/uiSlice";

export default function ToastContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const toasts = useSelector((s: RootState) => s.ui.toasts);

  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => dispatch(removeToast(t.id)), t.durationMs ?? 3000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            "px-4 py-2 rounded shadow text-white " +
            (t.type === "success"
              ? "bg-emerald-600"
              : t.type === "error"
              ? "bg-red-600"
              : "bg-slate-700")
          }
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
