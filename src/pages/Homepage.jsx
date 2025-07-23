import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import api from "../api.js";

export default function Homepage() {
  const [formattedDate, setFormattedDate] = useState("");
  const [projects, setProjects] = useState([]);
  const [lostMaking, setLostMaking] = useState([]);
  const [enableLeftMarquee, setEnableLeftMarquee] = useState(false);
  const [enableRightMarquee, setEnableRightMarquee] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // Check if scrolling is needed
    if (leftRef.current) {
      const container = leftRef.current;
      setEnableLeftMarquee(container.scrollHeight > container.clientHeight);
    }

    if (rightRef.current) {
      const container = rightRef.current;
      setEnableRightMarquee(container.scrollHeight > container.clientHeight);
    }
  }, [projects, lostMaking]);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const [dashboardRes, lostMakingRes] = await Promise.all([
          axios.get(api.front.get_dashboard),
          axios.get(api.front.lost_making_projects),
        ]);

        if (dashboardRes?.data?.status === 200) {
          setProjects(dashboardRes?.data?.data);
        }

        if (lostMakingRes?.data?.status === 200) {
          setLostMaking(lostMakingRes?.data?.data);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setFormattedDate(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="container-fluid">
        <div className="row g-0">
          {/* Left Column */}
          <div
            className="col-md-9"
            style={{
              height: "100vh",
              overflow: "hidden",
              background: "#424242",
            }}
          >
            {/* Sticky Header */}
            <div
              className="header py-2 px-3 d-flex align-items-center gap-3 sticky-top"
              style={{
                backgroundColor: "#424242",
                zIndex: 10,
              }}
            >
              <img src="/logo.png" alt="Logo" width="40" height="40" />
              <h5
                className="text-white fw-bold m-0"
                style={{ fontSize: "22px" }}
              >
                {formattedDate}
              </h5>
            </div>

            {/* Auto Scrolling Projects */}
            <div className="marquee-container" ref={leftRef}>
              {enableLeftMarquee ? (
                <div className="marquee-content-wrapper">
                  <div>
                    <div
                      className="row mt-4 px-3 pb-3"
                      style={{ gap: "20px 0px" }}
                    >
                      {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} col={4} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      className="row mt-4 px-3 pb-3"
                      style={{ gap: "20px 0px" }}
                    >
                      {projects.map((project, index) => (
                        <ProjectCard
                          key={`duplicate-${index}`}
                          project={project}
                          col={4}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row mt-4 px-3 pb-3" style={{ gap: "20px 0px" }}>
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} col={4} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div
            className="col-md-3"
            style={{
              height: "100vh",
              overflow: "hidden",
              background: "#333333",
            }}
          >
            {/* Sticky Section Title */}
            <div
              className="p-3 sticky-top"
              style={{ backgroundColor: "#333333", zIndex: 10 }}
            >
              <h4 className="text-white fw-bold mb-0 mt-0">
                Lost Making Projects
              </h4>
            </div>

            {/* Auto Scrolling Lost Making */}
            <div className="marquee-container" ref={rightRef}>
              {enableRightMarquee ? (
                <div className="marquee-content-wrapper">
                  <div>
                    <div
                      className="row mt-4 px-3 pb-3"
                      style={{ gap: "20px 0px" }}
                    >
                      {lostMaking.map((project, index) => (
                        <ProjectCard key={index} project={project} col={12} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      className="row mt-4 px-3 pb-3"
                      style={{ gap: "20px 0px" }}
                    >
                      {lostMaking.map((project, index) => (
                        <ProjectCard
                          key={`duplicate-${index}`}
                          project={project}
                          col={12}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row mt-4 px-3 pb-3" style={{ gap: "20px 0px" }}>
                  {lostMaking.map((project, index) => (
                    <ProjectCard key={index} project={project} col={12} isLostMaking={true} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
