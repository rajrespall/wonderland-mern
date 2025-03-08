import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./screens/Admin/Dashboard";
import Login from "./screens/Admin/Login";
import PDF from "./components/Admin/Pdf";
import useAdminStore from "../Store/adminStore";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const checkAuth = useAdminStore((state) => state.checkAuth);
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<AdminHome />} />} />
        <Route path="/pdf" element={<ProtectedRoute element={<PDF />} />} />
        
    
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
