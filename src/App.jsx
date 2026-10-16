import { useState, useEffect } from 'react';
import { api } from './services/api';
import StatsSummary from './components/StatsSummary';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

const defaultForm = {
  name: '',
  email: '',
  role: '',
  department: 'Engineering',
  salary: '',
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState('');

  // 1. READ OPERATION: Fetch all employees on mount
  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle controlled input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 2. CREATE or UPDATE Form Submit Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        // UPDATE (PUT)
        await api.updateEmployee(editingId, {
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
          department: formData.department,
          salary: Number(formData.salary),
        });
        setNotification(`Employee "${formData.name}" was updated successfully.`);
        setEditingId(null);
      } else {
        // CREATE (POST)
        const newEmp = await api.createEmployee({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
          department: formData.department,
          salary: Number(formData.salary),
        });
        setNotification(`Employee "${newEmp.name}" was registered successfully.`);
      }

      setFormData(defaultForm);
      await loadEmployees(); // Refresh state from API service
    } catch (err) {
      alert('Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(''), 4000);
    }
  };

  // 3. EDIT SELECT
  const handleEditSelect = (employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      salary: employee.salary,
    });
    setNotification(`Selected "${employee.name}" for modification.`);
  };

  // Cancel Edit mode
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(defaultForm);
  };

  // 4. DELETE OPERATION
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete employee "${name}"?`);
    if (!confirmed) return;

    try {
      await api.deleteEmployee(id);
      setNotification(`Employee "${name}" deleted.`);
      if (editingId === id) {
        handleCancelEdit();
      }
      await loadEmployees();
    } catch (err) {
      alert('Delete operation failed.');
    } finally {
      setTimeout(() => setNotification(''), 4000);
    }
  };

  // Reset to default dataset
  const handleReset = () => {
    api.reset();
    handleCancelEdit();
    loadEmployees();
    setNotification('Restored initial company staff database.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-slate-800">
              StaffPortal<span className="text-slate-900">.</span>
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
              U5-PRAC 5
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Complete CRUD Application with API Integration
          </span>
        </div>
      </header>

      {/* Lab Banner */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-1">
          <div>
            <span className="font-semibold text-slate-800">Practical 10 (Unit 5 Prac 5):</span> Employee Management System (Complete CRUD)
          </div>
          <div className="text-emerald-700 font-medium">
            ● Unit 5 – CRUD Capstone System
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Cards Component */}
        <StatsSummary employees={employees} />

        {/* Notification Toast */}
        {notification && (
          <div className="p-3 bg-slate-800 text-white text-xs rounded-lg flex justify-between items-center shadow-xs">
            <span>ℹ {notification}</span>
            <button onClick={() => setNotification('')} className="font-bold hover:underline">
              ✕
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-4 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500">Connecting to API service...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column (Create / Update) */}
            <div className="lg:col-span-5">
              <EmployeeForm
                formData={formData}
                onChange={handleFormChange}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelEdit}
                isEditing={Boolean(editingId)}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Table Column (Read / Delete / Edit Trigger) */}
            <div className="lg:col-span-7 space-y-4">
              <EmployeeTable
                employees={employees}
                onEdit={handleEditSelect}
                onDelete={handleDelete}
                activeEditId={editingId}
              />

              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  ↻ Reset Database to Initial Factory State
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        React Practical 10 (Unit 5 Prac 5) | Complete Employee Management System (CRUD)
      </footer>
    </div>
  );
}

export default App;
