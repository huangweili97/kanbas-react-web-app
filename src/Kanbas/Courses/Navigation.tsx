import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import "../styles.css";  

export default function CoursesNavigation() {
  const { cid } = useParams();  // 获取 URL 中的 cid 参数

  // 定义需要的链接
  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People" },
  ];

  // 使用 useState 来存储当前激活的链接
  const [activeLink, setActiveLink] = useState(`/Kanbas/Courses/${cid}/Home`);

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link 
          key={link.path} 
          to={`/Kanbas/Courses/${cid}/${link.path}`} // 动态构建路径，包含 cid
          onClick={() => setActiveLink(`/Kanbas/Courses/${cid}/${link.path}`)}
          className={`list-group-item border-0 ${activeLink === `/Kanbas/Courses/${cid}/${link.path}` ? "active" : ""}`}>
          {link.label}  {/* 动态渲染链接标签 */}
        </Link>
      ))}
    </div>
  );
}
