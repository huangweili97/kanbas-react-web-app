import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { Navigate, Route, Routes, useParams,useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fa0 } from "react-icons/fa6";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { courses } from "../Database";
import Editor from "./Assignments/Editor";
export default function Courses() {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}  &gt; {pathname.split("/")[4]} </h2> <hr />
      <div className="d-flex">


        <div className="d-done d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">


          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<Editor />} />
            <Route path="People" element={<PeopleTable/>} />
          </Routes>
        </div></div>

    </div >
  );
}