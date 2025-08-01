import { NavLink } from "react-router-dom";

export default function AdminSidebar({ collapsed }) {
  return (
    <div
      className={`admin-sidebar bg-dark text-white ${
        collapsed ? "collapsed" : ""
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: collapsed ? "60px" : "200px",
        transition: "width 0.3s ease-in-out",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <div className="text-center">
        <img className="admin_logo" src="/icon.png" alt="" />
      </div>

      <ul className="nav flex-column px-2">
        <li className="nav-item">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            Projects
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
