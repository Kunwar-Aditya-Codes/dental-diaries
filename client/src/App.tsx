import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import Register from "./pages/Auth/Register";
import DashboardLayout from "./components/DashboardLayout";
import NewForm from "./pages/Users/NewForm";
import Dashboard from "./pages/Users/Dashboard";
import AdminLogin from "./pages/Auth/AdminLogin";
import ViewForms from "./pages/Admin/ViewForms";

function App({}) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/user_register" element={<Register />} />

        <Route path="/admin_login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* User Routes */}

          <Route path="/dashboard/users">
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/users/new" element={<NewForm />} />
            <Route path="/dashboard/users/history" element={<h1>History</h1>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/dashboard/admin">
            <Route path="/dashboard/admin/view" element={<ViewForms />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
