import React from "react";
import { FaPlus } from "react-icons/fa";

export default function AssignmentButtons() {
    return (
        <div className="d-flex justify-content-end mb-3">
            <button id="wd-add-assignment-group" className="btn btn-secondary me-2">
                <FaPlus className="me-1" /> Group
            </button>
            <button id="wd-add-assignment" className="btn btn-danger">
                <FaPlus className="me-1" /> Assignment
            </button>
        </div>
    );
}
