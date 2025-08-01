import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // or session logic
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand bg-white shadow-sm px-3 d-flex justify-content-between align-items-center">
      <button
        className="btn btn-outline-secondary d-md-none"
        onClick={onToggleSidebar}
      >
        ☰
      </button>
      <span className="navbar-brand mb-0 h5">Mplussoft Dashboard</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
