# Dashboard (Vite + React + Tailwind v4 + TypeScript)

A small dashboard to manage employees and leave requests. Built with Vite, React, Redux Toolkit, Tailwind CSS v4, and Firebase Auth. Includes dark mode, sorting, pagination, skeleton loaders, toasts, and a mock REST API via json-server.

### Features

- Employee directory: search, filter, sort, paginate, add, delete
- Leave requests: search, filter, sort, paginate, add, delete, change status
- Firebase auth (Redux-based) with protected routes
- Dark mode toggle (class strategy, Tailwind CSS v4)
- Global toasts and error boundary
- Skeleton loading states
- Basic unit test setup (Vitest + Testing Library)

### Stack

- React 19, TypeScript, Vite 5
- Redux Toolkit, React Router 7
- Tailwind CSS v4
- Firebase Auth
- json-server (mock API)
- Vitest + @testing-library/react

### Requirements

- Node.js 18+
- npm 9+

### Project Structure

`src/
components/ # Sidebar, modals, toasts, error boundary, etc.
layout/ # App layout and header
pages/ # Employees, LeaveRequests, Profile, Login
store/ # Redux slices (auth, theme, employees, leaveRequests, ui)
services/ # API client for json-server
types/ # Shared TypeScript types
main.tsx # App bootstrap
index.css # Tailwind import + v4 dark variant`

### Auth

- Firebase Auth integrated via Redux. Routes protected by ProtectedRoute.
- While auth initializes, a small non-blocking overlay chip is shown (no full-screen blank page).

### Mock API Endpoints

- Employees: GET/POST/PATCH/DELETE http://localhost:5000/employees
- LeaveRequests: GET/POST/PATCH/DELETE http://localhost:5000/leaveRequests
- Note: IDs in db.json can be strings; the app handles string/number IDs.

### Setup

- Open a terminal and run the following command to start the mock backend server:
  `npx json-server --watch db.json --port 5000
`
- In a new terminal window, run the following command to start the frontend development server:
  `npm run dev`

- Your application will now be running locally.

## Firebase Setup

- Create a .env file in the root of your project (this file is not pushed to Git for security).
  `VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_APP_ID=your_app_id_here`
- Your app reads these variables via import.meta.env
- To run your app locally with Firebase, after adding .env file, start the development server.

### Testing

- Vitest + @testing-library/react
- Example: src/pages/**tests**/Profile.test.tsx

### Troubleshooting

- Dark mode not applying:
  - Ensure @custom-variant dark exists in src/index.css
  - Ensure <html> has/doesn’t have class="dark" as expected
- “Loading…” flashes:
  - Suspense and auth show a small overlay chip; there should be no full-page blank screen
- API errors:
  - Ensure json-server is running on port 5000
- “Invalid employee” in Add Leave:
  - Ensure employee exists; IDs can be string or number (handled)

### Login

-casprassignment@test.com
-password: caspr_123
