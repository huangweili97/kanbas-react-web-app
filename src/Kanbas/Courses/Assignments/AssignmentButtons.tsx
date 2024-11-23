// AssignmentButtons.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AssignmentButtons() {
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    navigate("new");
  };

  return (
    <div className="d-flex justify-content-end mb-3">
      <button id="wd-add-assignment" className="btn btn-danger" onClick={handleAddAssignment}>
        <FaPlus className="me-1" /> Assignment
      </button>
    </div>
  );
}
