import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";
import NewForm from "./pages/Users/NewForm";

function App({}) {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user_register" element={<Register />} />
        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* User Routes */}
          <Route path="/dashboard/users">
            <Route path="/dashboard/users/new" element={<NewForm />} />
            <Route path="/dashboard/users/history" element={<h1>History</h1>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/dashboard/admin"></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
