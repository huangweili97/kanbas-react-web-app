import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { BsGripVertical } from "react-icons/bs"; // 左侧的 8 点图标
import { IoEllipsisVertical } from "react-icons/io5"; // 右侧的操作图标
import { FaClipboard } from "react-icons/fa"; // 绿色记事板图标
import GreenCheckmark from "./GreenCheckmark"; // 绿色勾图标

// 定义 AssignmentListItem 组件的 Props 类型
interface AssignmentListItemProps {
  assignment: {
    _id: string;
    title: string;
    course: string;
  };
  cid: string;
}

export default function AssignmentListItem({ assignment, cid }: AssignmentListItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    // 删除前的确认提示
    const confirmed = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmed) {
      dispatch(deleteAssignment(assignment._id));
    }
  };

  const handleEdit = () => {
    // 导航到 Assignment 编辑页面
    navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`);
  };

  return (
    <li className="wd-assignment-list-item list-group-item d-flex align-items-start p-3 border-start border-success">
      {/* 左侧的 8 点图标 */}
      <BsGripVertical className="me-2 fs-3" />

      {/* 绿色记事板图标 */}
      <FaClipboard className="text-success me-2 fs-4" />

      {/* 作业内容和链接 */}
      <div className="ms-2 me-auto">
        {/* 动态生成 assignment 链接 */}
        <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
          {assignment.title} {/* 显示作业名称 */}
        </Link>

        {/* 其他作业信息 */}
        <p className="mb-1">
          <span className="text-danger">Multiple Modules</span> | <strong>Not available</strong> until May 6 at 12:00am
        </p>
        <p className="mb-0">
          <strong>Due</strong> May 13 at 11:59pm | 100pts
        </p>
      </div>

      {/* 右侧的操作图标 */}
      <div className="float-end d-flex align-items-center">
        {/* 绿色勾图标 */}
        <GreenCheckmark />
        {/* 操作按钮 */}
        <button onClick={handleEdit} className="btn btn-sm btn-warning me-2">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Delete
        </button>
        <IoEllipsisVertical className="fs-4 ms-2" />
      </div>
    </li>
  );
}
