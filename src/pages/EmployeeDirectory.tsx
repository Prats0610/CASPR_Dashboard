import React, { useEffect, useState, useMemo } from "react";
import Skeleton from "../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchEmployees,
  createEmployee,
  editEmployee,
  removeEmployee,
} from "../store/employeeSlice";
import { Employee } from "../types";
import AddEmployeeModal from "../components/AddEmployeeModal"; // ⬅ NEW

const EmployeeDirectory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: employees, loading } = useSelector(
    (state: RootState) => state.employees
  );

  const [q, setQ] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  type SortKey = "name" | "email" | "department" | "role" | "status";
  type SortOrder = "asc" | "desc";
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const depts = useMemo(
    () => ["All", ...Array.from(new Set(employees.map((e) => e.department)))],
    [employees]
  );

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesQ = (e.name + e.email + e.role)
        .toLowerCase()
        .includes(q.toLowerCase());
      const deptOk = deptFilter === "All" || e.department === deptFilter;
      return matchesQ && deptOk;
    });
  }, [employees, q, deptFilter]);

  useEffect(() => {
    setPage(1);
  }, [q, deptFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aVal = String(a[sortKey] ?? "").toLowerCase();
      const bVal = String(b[sortKey] ?? "").toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleAdd = (employee: Omit<Employee, "id">) => {
    dispatch(createEmployee(employee));
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Delete this employee?")) {
      dispatch(removeEmployee(id));
    }
  };

  const handleEditStatus = (id: string | number, status: string) => {
    dispatch(editEmployee({ id, data: { status } }));
  };

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email or role"
            className="border px-3 py-2 rounded dark:bg-slate-700 dark:border-slate-600"
          />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-slate-700 dark:border-slate-600"
          >
            {depts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-sky-600 text-white px-3 py-2 rounded hover:bg-sky-700"
        >
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded shadow overflow-x-auto">
        {loading ? (
          <div className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <table className="min-w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                {(
                  [
                    ["name", "Name"],
                    ["email", "Email"],
                    ["department", "Department"],
                    ["role", "Role"],
                    ["status", "Status"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th
                    key={key}
                    className="text-left px-4 py-3 text-slate-700 dark:text-slate-200"
                  >
                    <button
                      onClick={() => handleSort(key)}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {label}
                      {sortKey === key && (
                        <span aria-hidden>
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </button>
                  </th>
                ))}
                <th className="text-left px-4 py-3 text-slate-700 dark:text-slate-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((emp) => (
                <tr key={emp.id} className="border-t dark:border-slate-700">
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.department}</td>
                  <td className="px-4 py-3">{emp.role}</td>
                  <td className="px-4 py-3">
                    <select
                      value={emp.status}
                      onChange={(e) => handleEditStatus(emp.id, e.target.value)}
                      className="border px-2 py-1 rounded dark:bg-slate-700 dark:border-slate-600"
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {sorted.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Rows:
            </label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border px-2 py-1 rounded dark:bg-slate-700 dark:border-slate-600"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 bg-white dark:bg-slate-700 dark:border-slate-600"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 bg-white dark:bg-slate-700 dark:border-slate-600"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <AddEmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
};

export default EmployeeDirectory;
