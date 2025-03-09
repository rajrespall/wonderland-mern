import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./screens/Admin/Dashboard";
import Login from "./screens/Admin/Login";
import PDF from "./components/Admin/Pdf";
import useAdminStore from "../Store/adminStore";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const checkAuth = useAdminStore((state) => state.checkAuth);
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth(); // ✅ Ensures authentication is checked properly
      setLoading(false);
    };
    fetchAuth();
  }, [checkAuth]);

  if (loading) return null; // ✅ Prevents incorrect redirects while checking authentication

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<AdminHome />} />} />
        <Route path="/pdf" element={<ProtectedRoute element={<PDF />} />} />

        {/* ✅ Prevents logged-in admins from accessing the login page */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
