import React from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm.jsx";

export default function EditProject() {
  const { id } = useParams(); // project ID from URL
  return <ProjectForm mode="edit" projectId={id} />;
}
