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
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import ViewHistory from "./pages/Users/ViewHistory";
import EditForm from "./pages/Admin/EditForm";
import CreateAdmin from "./pages/Admin/CreateAdmin";
import ViewAdmins from "./pages/Admin/ViewAdmins";

function App({}) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/user_register" element={<Register />} />

        <Route path="/admin_login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* User Routes */}
            <Route element={<RequireAuth role={["user"]} />}>
              <Route path="/dashboard/users">
                <Route index element={<Dashboard />} />
                <Route path="/dashboard/users/new" element={<NewForm />} />
                <Route
                  path="/dashboard/users/history"
                  element={<ViewHistory />}
                />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<RequireAuth role={["admin", "super"]} />}>
              <Route path="/dashboard/admin">
                <Route path="/dashboard/admin/view" element={<ViewForms />} />
                <Route path="/dashboard/admin/edit" element={<EditForm />} />

                {/* Super Admin Routes */}
                <Route element={<RequireAuth role={["super"]} />}>
                  <Route
                    path="/dashboard/admin/create"
                    element={<CreateAdmin />}
                  />

                  <Route
                    path="/dashboard/admin/view_admins"
                    element={<ViewAdmins />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
