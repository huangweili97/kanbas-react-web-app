import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function AssignmentButtons() {
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    // Click + Assignment button, navigate to create a new assignment page
    navigate("new");
  };

  const handleAddGroup = () => {
    // Reserved for future "Add Group" implementation
    console.log("Add Group clicked");
  };

  return (
    <div className="d-flex justify-content-end mb-3">
      {/* Add Group button */}
      <button
        id="wd-add-assignment-group"
        className="btn btn-secondary me-2"
        onClick={handleAddGroup}
      >
        <FaPlus className="me-1" /> Group
      </button>

      {/* Add Assignment button */}
      <button
        id="wd-add-assignment"
        className="btn btn-danger"
        onClick={handleAddAssignment}
      >
        <FaPlus className="me-1" /> Assignment
      </button>
    </div>
  );
}
