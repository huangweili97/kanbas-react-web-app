// src/Kanbas/Courses/Assignments/index.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentListItem from "./AssignmentListItem"; // 引入 AssignmentListItem
import AssignmentEditor from "./Editor";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";

export default function Assignments() {
  const { cid } = useParams(); // 获取课程 ID
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer?.assignments || []);
  
  // 根据课程 ID 筛选当前课程的作业
  const assignmentsCurrent = assignments.filter((assignment: any) => assignment.course === cid);

  console.log("current assignments : ", assignmentsCurrent);

  return (
    <div id="wd-assignments" className="container mt-4">
      <SearchBar />
      <AssignmentButtons />

      <div className="wd-title p-3 ps-2 bg-secondary text-white rounded d-flex align-items-center">
        <h3 className="me-auto mb-0">Assignments</h3>
      </div>

      <ul id="wd-assignment-list" className="list-group mt-3">
        {assignmentsCurrent.length > 0 ? (
          assignmentsCurrent.map((assignment: any) => (
            <AssignmentListItem key={assignment._id} assignment={assignment} cid={cid!} />
          ))
        ) : (
          <li className="list-group-item text-center text-muted p-4 border rounded">
            No assignments found for this course.
          </li>
        )}
      </ul>

      {/* Routing configuration */}
      <Routes>
        <Route path="new" element={<AssignmentEditor />} />
        <Route path=":assignmentId" element={<AssignmentEditor />} />
      </Routes>
    </div>
  );
}


























// import React from "react";
















// import { useSelector, useDispatch } from "react-redux";
// import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
// import { deleteAssignment } from "./reducer";
// import SearchBar from "./SearchBar";
// import AssignmentButtons from "./AssignmentButtons";
// import AssignmentEditor from "./Editor";
// import { BsTrash } from "react-icons/bs";

// export default function Assignments() {
//   const {cid }  = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const assignments = useSelector((state: any) => state.assignmentsReducer?.assignments || []);
//   const assignmentsCurrent = assignments.filter((assignment: any) => assignment.course === cid);
//   console.log('current assignments : ', assignmentsCurrent);


//   const handleDelete = (assignmentId: string) => {
//     if (window.confirm("Are you sure you want to delete this assignment?")) {
//       dispatch(deleteAssignment(assignmentId));
//     }
//   };

//   return (
//     <div id="wd-assignments" className="p-3">
//       <SearchBar />
//       <AssignmentButtons />

//       <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
//         <h3 className="me-auto mb-0">Assignments</h3>
//       </div>

//       <ul id="wd-assignment-list" className="list-group">
//         {assignmentsCurrent.map((assignment: any) => (
//           <li key={assignment._id} className="list-group-item d-flex align-items-center">
//             <Link to={`${assignment._id}`} className="me-auto">
//               {assignment.title}
//             </Link>
//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => handleDelete(assignment._id)}
//             >
//               <BsTrash />
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Routing configuration */}
//       <Routes>
//         <Route path="new" element={<AssignmentEditor />} />
//         <Route path=":assignmentId" element={<AssignmentEditor />} />
//       </Routes>
//     </div>
//   );
// }
