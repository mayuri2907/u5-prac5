function StatsSummary({ employees }) {
  const totalEmployees = employees.length;
  const avgSalary =
    totalEmployees > 0
      ? Math.round(employees.reduce((acc, curr) => acc + curr.salary, 0) / totalEmployees)
      : 0;

  const engineeringCount = employees.filter((e) => e.department === 'Engineering').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold uppercase text-slate-500">Total Workforce</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalEmployees} Employees</h3>
        <span className="text-[11px] text-slate-400 mt-1 block">Active on payroll</span>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold uppercase text-slate-500">Average Salary</p>
        <h3 className="text-2xl font-bold text-emerald-700 mt-1">₹{avgSalary.toLocaleString('en-IN')}/mo</h3>
        <span className="text-[11px] text-slate-400 mt-1 block">Across all departments</span>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold uppercase text-slate-500">Engineering Team</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{engineeringCount} Engineers</h3>
        <span className="text-[11px] text-slate-400 mt-1 block">Core development unit</span>
      </div>
    </div>
  );
}

export default StatsSummary;
