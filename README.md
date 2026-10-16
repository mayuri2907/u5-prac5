# Practical 10: Complete CRUD Application (Unit 5 Prac 5)

## Aim
Develop a simple **Employee Management System** using React that performs **Create, Read, Update, and Delete (CRUD)** operations and demonstrates components, state, props, event handling, conditional rendering, list rendering, forms, and API integration.

## GitHub Repository
`https://github.com/mayuri2907/u5-prac5.git`

## Core Concepts & Implementation
1. **Components**:
   - `EmployeeForm`: Controlled form for both Adding and Editing staff.
   - `EmployeeTable`: Interactive table with search filter and department dropdown.
   - `StatsSummary`: Overview counters for total staff, average compensation, and engineering count.
2. **State & Props**:
   - Passes states and callback functions (`onEdit`, `onDelete`, `onChange`, `onSubmit`) downward via props.
3. **Event Handling**:
   - Handles `onSubmit`, `onClick`, `onChange`, and `onCancel` events seamlessly.
4. **Conditional Rendering**:
   - Switches between "Create (POST)" and "Update (PUT)" states dynamically.
   - Shows loading spinners and empty search states.
5. **List Rendering**:
   - Uses `.map()` with unique `key={emp.id}` for DOM reconciliation.
6. **API Integration**:
   - Async API service (`services/api.js`) simulating REST endpoints (`GET`, `POST`, `PUT`, `DELETE`) with `localStorage` persistence.

## How to Run Locally
```bash
npm install
npm run dev
```

## Push to GitHub
```bash
git remote add origin https://github.com/mayuri2907/u5-prac5.git
git branch -M main
git push -u origin main
```
