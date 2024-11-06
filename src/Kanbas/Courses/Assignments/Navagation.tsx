import { Routes, Route } from "react-router-dom";
import AssignmentEditor from "./Editor";

// 在 Assignments 组件内
<Routes>
  <Route path="new" element={<AssignmentEditor />} />
  <Route path=":assignmentId" element={<AssignmentEditor />} />
</Routes>

