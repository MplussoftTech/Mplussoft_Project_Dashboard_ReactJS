import React from "react";
import { renderStatus } from "../Utils/utils.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../api.js";

export default function ProjectsTable({ projects, currentPage, limit, updateRecords }) {
  const handleDelete = async (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete?</p>
        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              try {
                const res = await axios.post(api.admin.delete_project, {
                  id,
                  table: "mplus_projects_dashboard",
                }); // your API endpoint

                if(res?.status === 200){
                  updateRecords((prev) => prev - 1); //reduce 1 record from total to again refetch data
                  toast.dismiss(); 
                  toast.success("Deleted successfully");
                }
              } catch (error) {
                toast.dismiss();
                toast.error("Failed to delete");
              }
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false } // keep open until user chooses
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th width="5%">Sr No</th>
            <th width="20%">Project Name</th>
            <th width="12%">Start Date</th>
            <th width="12%">End Date</th>
            <th width="5%">Number of Working Days</th>
            <th width="8%">Status</th>
            <th width="10%">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects?.length > 0 ? (
            projects.map((project, index) => (
              <tr key={project?.id}>
                <td>{(currentPage - 1) * limit + index + 1}</td>
                <td>{project?.project_name}</td>
                <td>{project?.project_start_date}</td>
                <td>{project?.project_end_date}</td>
                <td>{project?.no_of_working_days}</td>
                <td>{renderStatus(project?.status)}</td>
                <td>
                  <Link
                    to={`/admin/projects/edit/${project?.id}`}
                    className="btn btn-sm btn-primary me-2"
                  >
                    <i className="bi bi-pencil"></i>
                  </Link>
                  {/* <button className="">Edit</button> */}
                  <button className="btn btn-sm btn-info text-white me-2">
                    <i className="bi bi-eye"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-danger text-white"
                    onClick={() => handleDelete(project?.id)}
                  >
                    <i className="bi bi-trash"></i>
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
