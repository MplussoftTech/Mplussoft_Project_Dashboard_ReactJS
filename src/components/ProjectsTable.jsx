import React from "react";
import { renderStatus } from "../Utils/utils.js";
import { Link } from "react-router-dom";

export default function ProjectsTable({ projects, currentPage, limit }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Sr No</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Number of Working Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects?.length > 0 ? (
            projects.map((project, index) => (
              <tr key={project?.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{project?.project_name}</td>
                <td>{project?.project_start_date}</td>
                <td>{project?.no_of_working_days}</td>
                <td>{renderStatus(project?.status)}</td>
                <td>
                  <Link
                    to={`/admin/projects/edit/${project?.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </Link>
                  {/* <button className="">Edit</button> */}
                  <button className="btn btn-sm btn-info text-white">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
