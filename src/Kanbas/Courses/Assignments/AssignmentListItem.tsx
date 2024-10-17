import React from "react";
import { Link } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs"; // 8点图标
import { IoEllipsisVertical } from "react-icons/io5"; // 右侧三个点的图标
import { FaClipboard } from "react-icons/fa"; // 绿色记事板图标
import GreenCheckmark from "./GreenCheckmark"; // 引入绿色勾

// 定义 AssignmentListItem 组件的 Props 类型
interface AssignmentListItemProps {
  assignment: {
    _id: string;
    title: string;
    course: string;
  };
  cid: string;
}

export default function AssignmentListItem(props: AssignmentListItemProps) {
  // 使用 const 代替解构赋值
  const assignment = props.assignment;
  const cid = props.cid;

  return (
    <li className="wd-assignment-list-item list-group-item d-flex align-items-start p-3 border-start border-success">
      {/* 左侧的8点图标 */}
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
      <div className="float-end">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4 ms-2" />
      </div>
    </li>
  );
}
