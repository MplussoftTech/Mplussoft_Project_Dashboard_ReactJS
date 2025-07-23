import React, { useState, useEffect } from "react";
import StatusChangeLog from "../../components/StatusChangeLog.jsx";
import axios from "axios";
import api from "../../api.js";
import { renderStatus } from "../../Utils/utils.js";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const statusOptions = [
  { value: "on_board", label: "Onboarding" },
  { value: "on_going", label: "Ongoing" },
  { value: "closed", label: "Closed" },
  { value: "on_hold", label: "Hold" },
  { value: "cancel", label: "Cancelled" },
];

export default function ProjectForm({ mode, projectId }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    project_name: "",
    project_start_date: "",
    project_start_time: "",
    no_of_working_days: "",
    status: "on_board",
    ba_start_date: "",
    design_start_date: "",
    development_start_date: "",
    qa_start_date: "",
    uat_start_date: "",
    production_start_date: "",
    remark: "",
  });

  const [initialStatus, setInitialStatus] = useState("");

  useEffect(() => {
    const getEditData = async () => {
      const token = localStorage.getItem("auth_token");
      if (mode === "edit" && projectId) {
        const res = await axios(`${api.admin.edit_project}/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setForm({
          ...res?.data?.data?.project,
          status: renderStatus(res?.data?.data?.project),
        });
        setLogs(res?.data?.data?.logs);
        // setInitialStatus(data.status);
      }
    };

    getEditData();
  }, [mode, projectId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("auth_token");

    try {
      const payload =
        mode === "edit"
          ? { ...form, id: projectId }
          : {
              project_name: form?.project_name,
              project_start_date: form?.project_start_date,
              project_start_time: form?.project_start_time,
              no_of_working_days: form?.no_of_working_days,
              status: form?.status,
            };

      const endpoint = mode === "edit" ? "update_project" : "add_project";

      const res = await axios.post(api.admin[endpoint], payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        navigate("/admin/projects");
      }
    } catch (error) {
      console.error(
        "Submission failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // hide loader after success or failure
    }
  };

  const statusChanged = mode === "edit" && form.status !== initialStatus;

  return (
    <div
      className={` ${
        location.pathname.startsWith("/admin/projects/edit")
          ? "container-fluid p-3"
          : "py-4 container  "
      }`}
    >
      <div className="row">
        <div className={mode === "edit" ? "col-md-9 p-3" : "col-12"}>
          <h3 className="mb-4">
            {mode === "add" ? "Add Project" : "Edit Project"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Project Name</label>
                <input
                  type="text"
                  name="project_name"
                  value={form.project_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Project Name"
                  required
                />
              </div>

              <div className="col-md-3">
                <label>Start Date</label> <br />
                <DatePicker
                  selected={form.project_start_date}
                  onChange={(date) =>
                    setForm({ ...form, project_start_date: date })
                  }
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  disabled={mode === "edit"}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="appt">Start Time</label> <br />
                <input
                  type="time"
                  id="appt"
                  name="project_start_time"
                  value={form?.project_start_time}
                  onChange={handleChange}
                  disabled={mode === "edit"}
                ></input>
              </div>

              {mode === "add" && (
                <div className="col-md-6">
                  <label>No. of Working Days</label>
                  <input
                    type="number"
                    name="no_of_working_days"
                    value={form.no_of_working_days}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              )}

              {mode === "add" && (
                <div className="col-md-6">
                  <label>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {[
                      { label: "Onboarding", value: "on_board" },
                      { label: "Ongoing", value: "on_going" },
                    ].map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {mode === "edit" && (
                <>
                  <div className="col-md-6">
                    <label>BA Start Date</label> <br />
                    <DatePicker
                      selected={form.ba_start_date}
                      onChange={(date) =>
                        setForm({ ...form, ba_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Design Start Date</label> <br />
                    <DatePicker
                      selected={form.design_start_date}
                      onChange={(date) =>
                        setForm({ ...form, design_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Development Start Date</label> <br />
                    <DatePicker
                      selected={form.development_start_date}
                      onChange={(date) =>
                        setForm({ ...form, development_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>QA Start Date</label> <br />
                    <DatePicker
                      selected={form.qa_start_date}
                      onChange={(date) =>
                        setForm({ ...form, qa_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>UAT Start Date</label> <br />
                    <DatePicker
                      selected={form.uat_start_date}
                      onChange={(date) =>
                        setForm({ ...form, uat_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Production Date</label> <br />
                    <DatePicker
                      selected={form.production_start_date}
                      onChange={(date) =>
                        setForm({ ...form, production_start_date: date })
                      }
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                    />
                  </div>

                  <hr />
                  <div className="col-md-6">
                    <label>No. of Working Days</label> <br />
                    <input
                      type="number"
                      name="no_of_working_days"
                      value={form.no_of_working_days}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {statusChanged && (
                    <div className="col-12">
                      <label>Status Change Remark</label>
                      <textarea
                        name="remark"
                        value={form.remark ?? ""}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  )}
                </>
              )}

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {mode === "add" ? "Creating..." : "Updating..."}
                    </>
                  ) : mode === "add" ? (
                    "Create Project"
                  ) : (
                    "Update Project"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        {mode === "edit" && (
          <div className="col-md-3 ps-3 p-0 sidebar-scroll">
            <StatusChangeLog logs={logs} />
          </div>
        )}
      </div>
    </div>
  );
}
