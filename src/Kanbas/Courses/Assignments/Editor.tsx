import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
}

export default function AssignmentEditor() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const {cid} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments || []);


  // If assignmentId is provided, find corresponding assignment; otherwise, create new assignment
  const existingAssignment = assignments.find((a: Assignment) => a._id === assignmentId);
  const [assignment, setAssignment] = useState<Assignment>(
    existingAssignment || {
      course: cid,
      title: "",
      description: "",
      points: 0,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
    }
  );

  // Populate editor fields when editing an existing assignment
  useEffect(() => {
    if (existingAssignment) setAssignment(existingAssignment);
  }, [existingAssignment]);

  if (!assignment && assignmentId) {
    return <div>Assignment not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment({ ...assignment, _id: new Date().getTime().toString() }));
      
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to Assignments page after save
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to Assignments page after cancel
  };

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      <h2>{existingAssignment ? "Edit Assignment" : "Create Assignment"}</h2>

      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Assignment Name</label>
        <input
          type="text"
          id="title"
          name="title"
          value={assignment.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={assignment.description}
          onChange={handleChange}
          className="form-control"
          rows={5}
          required
        />
      </div>

      {/* Points */}
      <div className="mb-3">
        <label htmlFor="points" className="form-label">Points</label>
        <input
          type="number"
          id="points"
          name="points"
          value={assignment.points}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Due Date */}
      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Available From */}
      <div className="mb-3">
        <label htmlFor="availableFrom" className="form-label">Available From</label>
        <input
          type="date"
          id="availableFrom"
          name="availableFrom"
          value={assignment.availableFrom}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Available Until */}
      <div className="mb-3">
        <label htmlFor="availableUntil" className="form-label">Available Until</label>
        <input
          type="date"
          id="availableUntil"
          name="availableUntil"
          value={assignment.availableUntil}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <button onClick={handleCancel} className="btn btn-secondary me-2">Cancel</button>
        <button onClick={handleSave} className="btn btn-success">Save</button>
      </div>
    </div>
  );
}
