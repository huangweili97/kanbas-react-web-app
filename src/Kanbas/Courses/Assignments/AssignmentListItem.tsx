import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaClipboard } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import * as assignmentsClient from "./cilent";

interface AssignmentListItemProps {
  assignment: {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
  };
  cid: string;
}

export default function AssignmentListItem({ assignment, cid }: AssignmentListItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 删除作业的逻辑
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmed) {
      try {
        await assignmentsClient.deleteAssignment(assignment._id);
        dispatch(deleteAssignment(assignment._id));
        alert("Assignment deleted successfully!");
      } catch (error) {
        console.error("Failed to delete assignment:", error);
        alert("Failed to delete assignment. Please try again.");
      }
    }
  };

  // 编辑作业的逻辑
  const handleEdit = () => {
    const url = `/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`;
    console.log("Navigating to:", url);
    navigate(url);
  };

  // 查看作业详情的逻辑
  const handleViewDetails = () => {
    const url = `/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`;
    console.log("Navigating to:", url);
    navigate(url);
  };

  console.log("AssignmentListItem props:", { assignment, cid });

  return (
    <li className="wd-assignment-list-item list-group-item d-flex align-items-start p-3 border-start border-success">
      {/* 左侧的 8 点图标 */}
      <BsGripVertical className="me-2 fs-3" />

      {/* 绿色记事板图标 */}
      <FaClipboard className="text-success me-2 fs-4" />

      {/* 作业内容和链接 */}
      <div className="ms-2 me-auto">
        {/* 点击标题查看详情 */}
        <span
          onClick={handleViewDetails}
          className="wd-assignment-link text-primary fw-bold"
          style={{ cursor: "pointer" }}
        >
          {assignment.title}
        </span>

        {/* 作业描述 */}
        <p className="mb-1 text-muted">{assignment.description}</p>

        {/* 作业信息 */}
        <p className="mb-1">
          <span className="text-danger">Available From:</span>{" "}
          {assignment.availableFrom} |{" "}
          <span className="text-danger">Available Until:</span>{" "}
          {assignment.availableUntil}
        </p>
        <p className="mb-0">
          <strong>Due:</strong> {assignment.dueDate} |{" "}
          <strong>{assignment.points}pts</strong>
        </p>
      </div>

      {/* 右侧的操作图标 */}
      <div className="float-end d-flex align-items-center">
        {/* 绿色勾图标 */}
        <GreenCheckmark />

        {/* 编辑按钮 */}
        <button
          onClick={handleEdit}
          className="btn btn-sm btn-warning me-2"
          title="Edit Assignment"
        >
          Edit
        </button>

        {/* 删除按钮 */}
        <button
          onClick={handleDelete}
          className="btn btn-sm btn-danger"
          title="Delete Assignment"
        >
          Delete
        </button>

        {/* 更多操作图标 */}
        <IoEllipsisVertical className="fs-4 ms-2" />
      </div>
    </li>
  );
}
