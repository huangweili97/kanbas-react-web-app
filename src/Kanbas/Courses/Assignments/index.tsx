// Assignments.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAssignments } from "./reducer";
import * as assignmentsClient from "./cilent";
import AssignmentListItem from "./AssignmentListItem";
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer?.assignments || []
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await assignmentsClient.fetchAssignmentsForCourse(cid!);
        console.log("Fetched assignments:", data); // 调试输出
        dispatch(setAssignments(data));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

 
  
  console.log("Redux assignments:", assignments); // 检查 Redux 数据
  

  return (
    <div id="wd-assignments" className="container mt-4">
      {/* 搜索栏和新增按钮 */}
      <SearchBar />
      <AssignmentButtons />

      {/* 标题 */}
      <div className="wd-title p-3 ps-2 bg-secondary text-white rounded d-flex align-items-center">
        <h3 className="me-auto mb-0">Assignments</h3>
      </div>

      {/* 作业列表 */}
      <ul id="wd-assignment-list" className="list-group mt-3">
        {assignments.length > 0 ? (
          assignments.map((assignment: any) => (
            <AssignmentListItem
              key={assignment._id}
              assignment={assignment}
              cid={cid!}
            />
          ))
        ) : (
          <li className="list-group-item text-center text-muted p-4 border rounded">
            No assignments found for this course.
          </li>
        )}
      </ul>
    </div>
  );
}
