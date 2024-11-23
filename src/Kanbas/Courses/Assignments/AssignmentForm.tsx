import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./cilent";

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

interface AssignmentFormProps {
  mode: "create" | "edit";
}

export default function AssignmentForm({ mode }: AssignmentFormProps) {
  const { assignmentId, cid } = useParams<{ assignmentId: string; cid: string }>();
  console.log("what is my url", useParams());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState<Assignment>({
    course: cid || "",
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    console.log("AssignmentForm loaded with", { mode, cid, assignmentId });

    const fetchAssignment = async () => {
      if (mode === "edit") {
        if (!assignmentId) {
          alert("Invalid assignment ID. Redirecting to assignments list.");
          navigate(`/Kanbas/Courses/${cid}/Assignments`);
          return;
        }

        try {
          const fetchedAssignment = await assignmentsClient.fetchAssignmentById(assignmentId);
          if (fetchedAssignment) {
            setAssignment(fetchedAssignment);
          } else {
            alert("Assignment not found. Redirecting to assignments list.");
            navigate(`/Kanbas/Courses/${cid}/Assignments`);
          }
        } catch (error) {
          console.error("Failed to fetch assignment:", error);
          alert("Failed to load assignment. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [mode, assignmentId, cid, navigate]);

  // useEffect(() => {
  //   console.log("Current URL:", window.location.href); // 打印当前浏览器URL
  //   console.log("Params from useParams:", { cid, assignmentId }); // 打印解析的参数
  // }, [cid, assignmentId]);

  // if (!assignmentId) {
  //   console.error("Invalid assignmentId:", assignmentId);
  //   return <div>Error: Invalid assignment ID</div>;
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (mode === "create") {
        const createdAssignment = await assignmentsClient.createAssignment(assignment);
        dispatch(addAssignment(createdAssignment));
        alert("Assignment created successfully.");
      } else {
        const updatedAssignment = await assignmentsClient.updateAssignment(assignment);
        dispatch(updateAssignment(updatedAssignment));
        alert("Assignment updated successfully.");
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{mode === "edit" ? "Edit Assignment" : "Create Assignment"}</h2>
      <form>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={assignment.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={assignment.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Points */}
        <div className="mb-3">
          <label htmlFor="points" className="form-label">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            className="form-control"
            value={assignment.points}
            onChange={handleChange}
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
            className="form-control"
            value={assignment.dueDate}
            onChange={handleChange}
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
            className="form-control"
            value={assignment.availableFrom}
            onChange={handleChange}
          />
        </div>

        {/* Available Until */}
        <div className="mb-3">
          <label htmlFor="availableUntil" className="form-label">Available Until</label>
          <input
            type="date"
            id="availableUntil"
            name="availableUntil"
            className="form-control"
            value={assignment.availableUntil}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
