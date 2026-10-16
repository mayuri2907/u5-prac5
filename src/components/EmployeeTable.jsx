import { useState } from 'react';

function EmployeeTable({ employees, onEdit, onDelete, activeEditId }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Filter employees by name/role and department
  const filtered = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Staff Directory ({filtered.length})
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Action: READ, UPDATE, DELETE
          </span>
        </div>

        {/* Department Filter Pills */}
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded text-xs bg-white text-slate-700"
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Management">Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Human Resources">Human Resources</option>
        </select>
      </div>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="🔍 Search staff by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-200 rounded-lg">
          No employee records match the given criteria.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
              <tr>
                <th className="p-3 border-b border-slate-200">Employee</th>
                <th className="p-3 border-b border-slate-200">Department</th>
                <th className="p-3 border-b border-slate-200">Role</th>
                <th className="p-3 border-b border-slate-200">Salary</th>
                <th className="p-3 border-b border-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              {filtered.map((emp) => {
                const isCurrentEdit = emp.id === activeEditId;
                return (
                  <tr
                    key={emp.id}
                    className={
                      isCurrentEdit
                        ? 'bg-amber-50/70 font-medium'
                        : 'hover:bg-slate-50 transition-colors'
                    }
                  >
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{emp.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{emp.email}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
                        {emp.department}
                      </span>
                    </td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3 font-semibold text-slate-800">
                      ₹{emp.salary.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onEdit(emp)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                          isCurrentEdit
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                        }`}
                      >
                        {isCurrentEdit ? 'Editing' : 'Edit'}
                      </button>
                      <button
                        onClick={() => onDelete(emp.id, emp.name)}
                        className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded text-xs font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
