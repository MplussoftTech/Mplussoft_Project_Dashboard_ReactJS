import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminRoutes from "./Routes/AdminRoutes.jsx";
import ProtectedRoute from "./Utils/ProtectedRoute.jsx";
import Homepage from "./pages/Homepage.jsx";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Homepage />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
