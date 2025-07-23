import React, { useEffect, useState, useRef } from "react";

export default function ProjectCard({ project, col, isLostMaking = false }) {
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const intervalRef = useRef(null);

  const toSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const totalDays = Number(project.no_of_working_days || 0);
  const remainingDays = Number(project.no_of_reaming_days || 0);
  const elapsedDays = totalDays - remainingDays;
  const elapsedPercentage = totalDays > 0 ? (elapsedDays / totalDays) * 100 : 0;

  useEffect(() => {
    if (!project?.countdown_24hr) return;

    const totalSeconds = toSeconds(project.countdown_24hr);
    let remainingSeconds = totalSeconds;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (remainingSeconds <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      remainingSeconds -= 1;
      setTimeLeft(formatTime(remainingSeconds));
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [project?.countdown_24hr]);

  const getColorClass = () => {
    if (remainingDays <= 1) return "overdue_timer_color"; // red if only 1 day or less left
    if (elapsedPercentage >= 75) return "overdue_timer_color"; // red based on % also
    if (elapsedPercentage >= 50) return "intermediate_timer_color"; // orange
    return "beginning_timer_color"; // green
  };

  if (!project) return null;

  return (
    <div className={`col-md-${col} ${col === 12 ? "mb-0" : ""} `}>
      <div className="card custom-project-card p-2">
        <h6 className="text-white mb-3 fw-bold">{project.project_name}</h6>

        <div className="d-flex align-items-center justify-content-center gap-1">
          <div
            className="p-1 pt-2 bg-white text-center rounded"
            style={{ width: "50%" }}
          >
            <h6 className="card-working-heading fw-bold">Total Working Days</h6>
            <h2 className="fw-bold mb-0">{project.no_of_working_days}</h2>
          </div>

          <div
            className="p-1  pt-2 bg-white text-center rounded"
            style={{ width: "50%" }}
          >
            <h6 className="card-working-heading fw-bold">
              {isLostMaking ? "Overdue" : "Remaining"} Days
            </h6>
            <h2
              className={`fw-bold mb-0 ${
                getColorClass() === "beginning_timer_color"
                  ? "normal_days_color"
                  : getColorClass()
              }`}
            >
              {project.no_of_reaming_days}
            </h2>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="d-flex align-items-center">
            <img src="/clock.svg" className="clock_style" alt="clock" />
            <h3 className={`fw-bold mb-0 ms-2 ${getColorClass()}`}>
              {timeLeft}
            </h3>
          </div>
          <div className="text-white">
            <span className="start-date">Start Date</span> <br />
            <h6>{project.project_start_date}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
