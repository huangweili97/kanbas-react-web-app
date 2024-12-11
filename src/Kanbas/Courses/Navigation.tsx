// import { useState } from "react";
// import { useParams } from "react-router";
// import { Link } from "react-router-dom";

// export default function CoursesNavigation() {
//   const { cid } = useParams(); // 获取 URL 中的 cid 参数

//   // 使用 useState 存储当前激活的链接
//   const [activeLink, setActiveLink] = useState(`/Kanbas/Courses/${cid || "unknown"}/Home`);

//   // 如果 cid 无效，显示占位符
//   if (!cid) {
//     console.error("Invalid 'cid' parameter in URL.");
//     return <div>Invalid course ID</div>;
//   }

//   // 定义需要的链接
//   const links = [
//     { label: "Home", path: "Home" },
//     { label: "Modules", path: "Modules" },
//     { label: "Piazza", path: "Piazza" },
//     { label: "Zoom", path: "Zoom" },
//     { label: "Assignments", path: "Assignments" },
//     { label: "Quizzes", path: "Quizzes" },
//     { label: "Grades", path: "Grades" },
//     { label: "People", path: "People" },
//   ];

//   console.log("Navigation links:", links.map((link) => `/Kanbas/Courses/${cid}/${link.path}`));

//   return (
//     <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
//       {links.map((link) => (
//         <Link
//           key={`link-${cid}-${link.label}`} // 确保 key 唯一
//           to={`/Kanbas/Courses/${cid}/${link.path}`} // 动态构建路径，包含 cid
//           onClick={() => setActiveLink(`/Kanbas/Courses/${cid}/${link.path}`)}
//           className={`list-group-item border-0 ${
//             activeLink === `/Kanbas/Courses/${cid}/${link.path}` ? "active" : ""
//           }`}>
//           {link.label} {/* 动态渲染链接标签 */}
//         </Link>
//       ))}
//     </div>
//   );
// }
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function CoursesNavigation() {
  const { pathname } = useLocation(); // 获取当前路径
  const cid = pathname.split("/")[3]; // 动态解析 cid

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

  if (!cid) {
    console.error("Invalid 'cid' parameter in URL.");
    return <div>Invalid course ID</div>;
  }

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={`link-${cid}-${link.label}`} // 确保 key 唯一
          to={`/Kanbas/Courses/${cid}/${link.path}`} // 动态构建路径，包含 cid
          className={`list-group-item border-0 ${
            pathname.endsWith(link.path) ? "active" : ""
          }`}>
          {link.label} {/* 动态渲染链接标签 */}
        </Link>
      ))}
    </div>
  );
}
