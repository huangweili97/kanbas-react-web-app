import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./cilent";
import * as coursesClient from "../client"; // 用于获取课程信息
import dayjs from "dayjs";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string; // `course` 保存的是 `course.number`
}

interface AssignmentFormProps {
  mode: "create" | "edit";
}

export default function AssignmentForm({ mode }: AssignmentFormProps) {
  const { cid, assignmentId } = useParams<{
    cid: string;
    assignmentId?: string;
  }>(); // 从 URL 获取参数
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [assignment, setAssignment] = useState<Assignment>({
    course: "",
    title: "",
    description: "",
    points: 0,
    dueDate: dayjs()
      .add(7, "day")
      .set("hour", 23)
      .set("minute", 59)
      .format("YYYY-MM-DD"),
    availableFrom: dayjs().startOf("day").format("YYYY-MM-DD"),
    availableUntil: dayjs()
      .add(30, "day")
      .set("hour", 23)
      .set("minute", 59)
      .format("YYYY-MM-DD"),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndAssignment = async () => {
      try {
        const course = await coursesClient.fetchCourseById(cid!);
        if (course && course.number) {
          setAssignment((prev) => ({ ...prev, course: course.number }));

          if (mode === "edit" && assignmentId) {
            const fetchedAssignment =
              await assignmentsClient.fetchAssignmentById(assignmentId);
            if (fetchedAssignment) {
              setAssignment((prev) => ({
                ...prev,
                ...fetchedAssignment,
                dueDate: dayjs(fetchedAssignment.dueDate).format("YYYY-MM-DD"), // 格式化日期
                availableFrom: dayjs(fetchedAssignment.availableFrom).format(
                  "YYYY-MM-DD"
                ),
                availableUntil: dayjs(fetchedAssignment.availableUntil).format(
                  "YYYY-MM-DD"
                ),
              }));
            }
          }
        }
      } catch (error) {
        console.error("Failed to load course or assignment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndAssignment();
  }, [mode, assignmentId, cid, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formattedAssignment = {
        ...assignment,
        dueDate: dayjs(assignment.dueDate)
          .set("hour", 23)
          .set("minute", 59)
          .toISOString(),
        availableFrom: dayjs(assignment.availableFrom)
          .startOf("day")
          .toISOString(),
        availableUntil: dayjs(assignment.availableUntil)
          .set("hour", 23)
          .set("minute", 59)
          .toISOString(),
      };

      if (mode === "create") {
        const createdAssignment = await assignmentsClient.createAssignment(
          formattedAssignment
        );
        dispatch(addAssignment(createdAssignment));
        alert("Assignment created successfully.");
      } else if (assignmentId) {
        const updatedAssignment = await assignmentsClient.updateAssignment(
          formattedAssignment
        );
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
          <label htmlFor="title" className="form-label">
            Title
          </label>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
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
          <label htmlFor="points" className="form-label">
            Points
          </label>
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
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
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
          <label htmlFor="availableFrom" className="form-label">
            Available From
          </label>
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
          <label htmlFor="availableUntil" className="form-label">
            Available Until
          </label>
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
