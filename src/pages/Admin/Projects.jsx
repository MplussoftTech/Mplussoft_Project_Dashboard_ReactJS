import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api.js";
import Pagination from "../../components/Pagination.jsx";
import ProjectsTable from "../../components/ProjectsTable.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // This will be used for actual filtering
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchProjects = async () => {
    const token = localStorage.getItem("auth_token");

    try {
      const res = await axios.get(api.admin.get_projects, {
        params: {
          page: currentPage,
          limit,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res?.data?.data);
      setTotalRecords(res?.data?.total);
    } catch (error) {
      if (
        error?.status === 403 &&
        error?.response?.data?.message === "Invalid token"
      ) {
        localStorage.removeItem("auth_token");
        navigate("/login");
      }
      console.log("Failed to fetch projects:", error?.status);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, limit, searchTerm, totalRecords]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  // debouning
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchTerm(searchInput); // Update actual search term after delay
      setCurrentPage(1); // Reset to page 1
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounce); // Clear previous timeout
  }, [searchInput]);

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Projects</h4>
        <Link to="/admin/projects/add" className="btn btn-primary">
          + Add Project
        </Link>
      </div>

      {/* Controls */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <label className="me-2">Show</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="form-select form-select-sm w-auto"
          >
            <option value={10}>10</option>
            <option value={20}>25</option>
          </select>
          <span>records per page</span>
        </div>

        {/* Search */}
        <input
          type="text"
          className="form-control form-control-sm w-25"
          placeholder="Search projects..."
          value={searchInput}
          onChange={handleSearchInput}
        />
      </div>

      {/* Table */}
      <ProjectsTable
        projects={projects}
        currentPage={currentPage}
        limit={limit}
        updateRecords={setTotalRecords}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalEntries={totalRecords}
        entriesPerPage={limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
