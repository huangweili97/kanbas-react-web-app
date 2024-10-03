import { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import "../styles.css";  

export default function CoursesNavigation() {
  // 使用 useState 来存储当前激活的链接
  const [activeLink, setActiveLink] = useState("/Kanbas/Courses/1234/Home");

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Courses/1234/Home"
        id="wd-course-home-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Home")}
        // 动态设置 active 类名
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Home" ? "active" : ""}`}>
        Home
      </Link>

      <Link to="/Kanbas/Courses/1234/Modules"
        id="wd-course-modules-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Modules")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Modules" ? "active" : ""}`}>
        Modules
      </Link>

      <Link to="/Kanbas/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Piazza")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Piazza" ? "active" : ""}`}>
        Piazza
      </Link>

      <Link to="/Kanbas/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Zoom")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Zoom" ? "active" : ""}`}>
        Zoom
      </Link>

      <Link to="/Kanbas/Courses/1234/Assignments"
        id="wd-course-quizzes-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Assignments")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Assignments" ? "active" : ""}`}>
        Assignments
      </Link>

      <Link to="/Kanbas/Courses/1234/Quizzes"
        id="wd-course-assignments-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/Quizzes")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/Quizzes" ? "active" : ""}`}>
        Quizzes
      </Link>

      <Link to="/Kanbas/Courses/1234/People"
        id="wd-course-people-link"
        onClick={() => setActiveLink("/Kanbas/Courses/1234/People")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Courses/1234/People" ? "active" : ""}`}>
        People
      </Link>
    </div>
  );
}
