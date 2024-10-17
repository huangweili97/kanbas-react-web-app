import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as db from "../../Database";
import 'bootstrap/dist/css/bootstrap.min.css';

// 定义 Assignment 的类型
interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export default function Editor() {
  const { aid } = useParams(); // 从 URL 中获取 aid
  console.log(useParams());
  const [assignment, setAssignment] = useState<Assignment | null>(null); // 处理 assignment 的状态
  const [description, setDescription] = useState(""); // 本地描述状态管理

  // 查找 assignment 并设置状态
  useEffect(() => {
    const foundAssignment = db.assignment.find((a) => a._id === aid);
    if (foundAssignment) {
      setAssignment(foundAssignment); // 设置 assignment 状态
      setDescription(`The assignment is available online. Submit a link to the landing page of the project.
This project involves a deep dive into environmental studies and HTML usage.
Ensure that all materials are uploaded properly and that the work submitted is original.
Please follow the guidelines as described in the syllabus.`); // 设置默认描述
    }
  }, [aid]);

  // 如果找不到 assignment，显示错误信息
  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      
      {/* Assignment Name */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        </div>
        <div className="col-sm-12">
          {/* 动态显示 assignment title */}
          <input id="wd-name" className="form-control" value={assignment.title} readOnly />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <textarea 
            id="wd-description" 
            className="form-control" 
            rows={5} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
      </div>

      {/* Submission Type Section */}
      <div className="row mb-3">
        <div className="d-flex align-items-start w-100">
          <label className="form-label fw-bold me-2" style={{ backgroundColor: 'white', padding: '0 5px' }}>Submission Type</label>
          <div className="p-3 border rounded flex-grow-1 w-100">
            
            {/* Submission Type */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-submission-type" className="form-label fw-bold">Submission Type</label>
                <select id="wd-submission-type" className="form-control">
                  <option value="ONLINE">Online</option>
                </select>
              </div>
            </div>

            {/* Online Entry Options */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label className="form-label fw-bold">Online Entry Options</label>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                  <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-website-url" />
                  <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                  <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                  <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                  <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Section */}
      <div className="row mb-3">
        <div className="d-flex align-items-start w-100">
          <label className="form-label fw-bold me-2" style={{ backgroundColor: 'white', padding: '0 5px' }}>Assign</label>
          <div className="p-3 border rounded flex-grow-1 w-100">
            
            {/* Assign To */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
                <input id="wd-assign-to" className="form-control" value="Everyone" />
              </div>
            </div>

            {/* Due */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                <input type="date" id="wd-due-date" className="form-control" value="2024-05-13" />
              </div>
            </div>

            {/* Available From and Until */}
            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available From</label>
                <input type="date" id="wd-available-from" className="form-control" value="2024-05-06" />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input type="date" id="wd-available-until" className="form-control" value="2024-05-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* Cancel 和 Save 按钮 */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-success">Save</button>
      </div>
    </div>
  );
}
