// import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import AssignmentForm from "./Assignments/AssignmentForm";
import CoursesNavigation from "./Navigation";
import QuizDetails from "./Quizs/QuizDetails";
import QuizDetailsEditor from "./Quizs/QuizDetailsEditor";
import QuizQuestionsEditor from "./Quizs/QuizQuestionsEditor";
import QuizPreview from "./Quizs/QuizPreview";
import Quizzes from "./Quizs";
import QuizEditor from "./Quizs/QuizEditor";
import FillInTheBlankQuestionEditor from "./Quizs/FillInTheBlankQuestionEditor";
import MultipleChoiceQuestionEditor from "./Quizs/MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./Quizs/TrueFalseQuestionEditor";
import QuestionEditorPage from "./Quizs/QuestionEditorPage";
import StudentQuizPage from "./Quizs/StudentQuizPage";
import GradePage from "./Grades";
import QuizDetailsPage from "./Grades/QuizDetailPage";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams(); // 当前课程 ID
  const course = courses.find((course) => course._id === cid); // 获取当前课程
  const { pathname } = useLocation(); // 当前路径信息

  return (
    <div id="wd-courses">
      {/* 页面标题 */}
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name || "Course"} &gt; {pathname.split("/")[4] || "Overview"}
      </h2>
      <hr />
      <div className="d-flex">
        {/* 左侧导航栏 */}
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        {/* 右侧主要内容 */}
        <div className="flex-fill">
          <Routes>
            {/* 默认跳转到 Home */}
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Grades" element={<GradePage />} />
            {/* Assignments 子页面 */}
            <Route
              path="Assignments/new"
              element={<AssignmentForm mode="create" />}
            />
            <Route
              path="Assignments/:assignmentId/edit"
              element={<AssignmentForm mode="edit" />}
            />
            <Route path="People" element={<PeopleTable />} />
            {/* Quizzes Routes */}
            <Route path="Quizzes/:quizId?" element={<QuizDetails />} />
            <Route
              path="Quizzes/:quizId?/edit"
              element={<QuizDetailsEditor />}
            />
            <Route path="Quizzes/:quizId?/editor" element={<QuizEditor />} />
            <Route
              path="Quizzes/:quizId?/questions"
              element={<QuizQuestionsEditor />}
            />
            <Route path="Quizzes/:quizId?/preview" element={<QuizPreview />} />
            <Route
              path="Quizzes/:quizId?/torf"
              element={<TrueFalseQuestionEditor />}
            />
            <Route
              path="Quizzes/:quizId?/multiple"
              element={<MultipleChoiceQuestionEditor />}
            />
            <Route
              path="Quizzes/:quizId?/fill"
              element={<FillInTheBlankQuestionEditor />}
            />
            <Route
              path="Quizzes/:quizId?/questionsEditor"
              element={<QuestionEditorPage />}
            />
            <Route
              path="Quizzes/:quizId?/attempt"
              element={<StudentQuizPage />}
            />
            <Route
              path="Grades/:quizId?/details"
              element={<QuizDetailsPage />}
            />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}
