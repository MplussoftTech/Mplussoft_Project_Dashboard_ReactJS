import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Projects from "../pages/Admin/Projects.jsx";
import AddProject from "../pages/Admin/AddProject.jsx";
import EditProject from "../pages/Admin/EditProject.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/add" element={<AddProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />

        {/* Add more nested routes if needed */}
      </Route>
    </Routes>
  );
}
