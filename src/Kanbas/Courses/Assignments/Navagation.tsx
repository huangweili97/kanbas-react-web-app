import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Assignments from "./index";
import AssignmentForm from "./AssignmentForm";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* 作业列表 */}
        <Route
          path="/Kanbas/Courses/:cid/Assignments"
          element={<Assignments />}
        />

        {/* 创建新作业 */}
        <Route
          path="/Kanbas/Courses/:cid/Assignments/new"
          element={<AssignmentForm mode="create" />}
        />

        {/* 编辑作业 */}
        <Route
          path="/Kanbas/Courses/:cid/Assignments/:assignmentId/edit"
          element={<AssignmentForm mode="edit" />}
        />

      
      </Routes>
    </Router>
  );
}
