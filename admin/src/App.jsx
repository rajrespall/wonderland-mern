import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./screens/Admin/Dashboard";
import Login from "./screens/Admin/Login";
import PDF from "./components/Admin/Pdf";
import useAdminStore from "../Store/adminStore";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<AdminHome />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pdf" element={<ProtectedRoute element={<PDF />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
