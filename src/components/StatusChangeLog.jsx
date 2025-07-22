import React from "react";
import { renderStatus } from "../Utils/utils";

export default function StatusChangeLog({ logs }) {
  return (
    <div
      className=" border-start ps-3 scroll-content flex-grow-1 overflow-auto"
      style={{ height: "100vh" }} // fixed height
    >
      <div className="mt-4">
        <h5>Status Change Log</h5>
      </div>

      {logs?.length === 0 ? (
        <p className="text-muted mt-2">No status changes yet.</p>
      ) : (
        <div className="flex-grow-1 overflow-auto mt-2 pe-2">
          {logs?.map((log, idx) => (
            <div key={idx} className="card mb-3 border-dark">
              <div className="card-body p-3">
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(log?.status_date).toLocaleString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </h6>
                <p className="mb-1">
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info text-dark">
                    {renderStatus(log?.status)}
                  </span>
                </p>
                <p className="mb-1">
                  <strong>Remark:</strong> {log?.status_remark}
                </p>
                <p className="mb-0">
                  <strong>Updated Days:</strong> {log?.updatedWorkingDays}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
