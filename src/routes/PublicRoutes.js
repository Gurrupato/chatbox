import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

function PublicRoutes() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthLayout>
  );
}

export default PublicRoutes;
