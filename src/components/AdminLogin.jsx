import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function AdminLogin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${api.admin.login}`, formData);

      if (res?.data?.status === 200) {
        localStorage.setItem("auth_token", res?.data?.data?.admin_token);
        setFormData({
          email: null,
          password: null,
        });
        navigate("/admin");
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Link to="/">
          <img className="admin_logo" src="/icon.png" alt="" />
        </Link>

        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value.trim(),
                }))
              }
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              className="form-control"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            <span
              className="position-absolute end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer", marginTop: "-17px" }}
              onClick={() => setPasswordShown(!passwordShown)}
            >
              <i
                className={`bi ${passwordShown ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </span>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
