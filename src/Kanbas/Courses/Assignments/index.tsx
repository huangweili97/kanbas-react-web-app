import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAssignments } from "./reducer";
import * as assignmentsClient from "./cilent";
import * as coursesClient from "../client"; // 用于获取课程信息
import AssignmentListItem from "./AssignmentListItem";
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Assignments() {
  const { cid } = useParams<{ cid: string }>(); // `cid` 是 `course._id`
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer?.assignments || []
  );
  const [courseNumber, setCourseNumber] = useState<string | null>(null); // 存储 course 的 number

  useEffect(() => {
    // 获取课程的 `number`，再加载该课程的作业
    const fetchCourseAndAssignments = async () => {
      try {
        // 获取 course 信息
        const course = await coursesClient.fetchCourseById(cid!); // 根据 `cid` 获取课程详情
        if (course && course.number) {
          setCourseNumber(course.number); // 保存课程的 number
          const data = await assignmentsClient.fetchAssignmentsForCourse(course.number); // 根据 number 获取作业
          dispatch(setAssignments(data)); // 保存到 Redux
        }
      } catch (error) {
        console.error("Failed to fetch course or assignments:", error);
      }
    };
    fetchCourseAndAssignments();
  }, [cid, dispatch]);

  console.log("Redux assignments:", assignments);

  return (
    <div id="wd-assignments" className="container mt-4">
      {/* 搜索栏和新增按钮 */}
      <SearchBar />
      <AssignmentButtons />

      {/* 标题 */}
      <div className="wd-title p-3 ps-2 bg-secondary text-white rounded d-flex align-items-center">
        <h3 className="me-auto mb-0">Assignments for Course {courseNumber || "Loading..."}</h3>
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




