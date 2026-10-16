// Simulated REST API Service with LocalStorage persistence

const STORAGE_KEY = 'ems_employees_data';

const initialEmployees = [
  {
    id: 1,
    name: 'Mayuri Vaishnav',
    email: 'mayuri@techcorp.com',
    role: 'Frontend Engineer',
    department: 'Engineering',
    salary: 75000,
    joinDate: '2024-03-15',
  },
  {
    id: 2,
    name: 'Sameer Khan',
    email: 'sameer.k@techcorp.com',
    role: 'UI/UX Designer',
    department: 'Design',
    salary: 68000,
    joinDate: '2023-11-01',
  },
  {
    id: 3,
    name: 'Tanvi Shah',
    email: 'tanvi.s@techcorp.com',
    role: 'Product Manager',
    department: 'Management',
    salary: 92000,
    joinDate: '2022-08-20',
  },
  {
    id: 4,
    name: 'Devang Joshi',
    email: 'devang.j@techcorp.com',
    role: 'DevOps Specialist',
    department: 'Engineering',
    salary: 82000,
    joinDate: '2023-05-10',
  },
];

// Initialize storage if empty
const getStoredData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));
    return initialEmployees;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialEmployees;
  }
};

export const api = {
  // READ (GET)
  async getEmployees() {
    await new Promise((res) => setTimeout(res, 300)); // Simulate network latency
    return getStoredData();
  },

  // CREATE (POST)
  async createEmployee(newEmp) {
    await new Promise((res) => setTimeout(res, 200));
    const current = getStoredData();
    const created = { ...newEmp, id: Date.now() };
    const updated = [created, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return created;
  },

  // UPDATE (PUT)
  async updateEmployee(id, updatedFields) {
    await new Promise((res) => setTimeout(res, 200));
    const current = getStoredData();
    const updated = current.map((emp) =>
      emp.id === id ? { ...emp, ...updatedFields } : emp
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.find((e) => e.id === id);
  },

  // DELETE (DELETE)
  async deleteEmployee(id) {
    await new Promise((res) => setTimeout(res, 200));
    const current = getStoredData();
    const updated = current.filter((emp) => emp.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  },

  // RESET
  reset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));
    return initialEmployees;
  },
};
