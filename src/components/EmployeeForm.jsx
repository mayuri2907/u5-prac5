function EmployeeForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded border ${
            isEditing
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {isEditing ? 'Action: UPDATE (PUT)' : 'Action: CREATE (POST)'}
        </span>
        <h2 className="text-xl font-bold text-slate-800 mt-2">
          {isEditing ? 'Edit Employee Details' : 'Register New Employee'}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {isEditing
            ? 'Update the employee credentials and click Save Changes.'
            : 'Fill in employee details to add them to the company directory.'}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Mayuri Vaishnav"
            value={formData.name}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Corporate Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="employee@techcorp.com"
            value={formData.email}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
        </div>

        {/* Role & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Role / Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              required
              placeholder="e.g. Frontend Developer"
              value={formData.role}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={onChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>
        </div>

        {/* Monthly Salary */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Monthly Salary (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="salary"
            required
            min="1000"
            placeholder="e.g. 75000"
            value={formData.salary}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 text-white rounded-md text-sm font-medium transition shadow-xs ${
              isEditing
                ? 'bg-amber-700 hover:bg-amber-800'
                : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            {isSubmitting
              ? 'Processing...'
              : isEditing
              ? '✓ Update Employee'
              : '+ Add Employee'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition border border-slate-300"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
