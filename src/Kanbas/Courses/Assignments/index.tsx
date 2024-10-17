import React, { useState, useEffect } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import * as db from "../../Database"; // 导入数据库
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentListItem from "./AssignmentListItem"; // 引入 AssignmentListItem
import AssignmentEditor from "./Editor"; // 引入 AssignmentEditor
import { BsGripVertical } from "react-icons/bs"; // 8点图标
import { IoEllipsisVertical } from "react-icons/io5"; // 右侧三个点的图标
import { FaCaretDown } from "react-icons/fa"; // 黑色倒三角图标
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";

// 定义 Assignment 的类型
type Assignment = {
  _id: string;
  title: string;
  course: string;
};

export default function Assignments() {
  const { cid } = useParams(); // 获取课程 ID

  // 初始化 useState 时为 assignments 添加类型
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // 根据课程 ID 筛选出对应的作业数据
  useEffect(() => {
    const filteredAssignments = db.assignment.filter((assignment: Assignment) => assignment.course === cid);
    setAssignments(filteredAssignments);
  }, [cid]);

  return (
    <div id="wd-assignments" className="p-3">
      <SearchBar />
      <AssignmentButtons />

      <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />
        <FaCaretDown className="me-2 fs-4" />
        <h3 className="me-auto mb-0">Assignments</h3>

        <button className="btn btn-sm btn-light rounded-pill me-2">
          40% of Total
        </button>
        <button className="btn btn-sm btn-light me-2">+</button>
        <IoEllipsisVertical className="fs-4 ms-2" />
      </div>

      {/* 作业列表 */}
      <ul id="wd-assignment-list" className="list-group">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentListItem key={assignment._id} assignment={assignment} cid={cid!} />
          ))
        ) : (
          <li className="list-group-item">No assignments found for this course.</li>
        )}
      </ul>

      {/* 路由配置 */}
      <Routes>
        {/* 作业详细编辑页面 */}
        <Route path="/Kanbas/Courses/:cid/Assignments/:assignmentId" element={<AssignmentEditor />} />
      </Routes>
    </div>
  );
}
