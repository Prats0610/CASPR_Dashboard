import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem = ({ to, children }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 ${
        isActive ? "bg-slate-200 dark:bg-slate-700 font-semibold" : ""
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 min-h-screen p-4 hidden md:block">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <nav className="space-y-2">
        <NavItem to="/employees">Employee Directory</NavItem>
        <NavItem to="/leave-requests">Leave Requests</NavItem>
        <NavItem to="/profile">Profile</NavItem>
      </nav>
    </aside>
  );
}
