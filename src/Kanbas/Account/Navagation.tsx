import { Link, useLocation  } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 const { pathname } = useLocation(); // 获取当前路径
 const active = (path: string) => (pathname.includes(path) ? "active" : "");
 return (
   <div id="wd-account-navigation" className="list-group">
     {links.map((link) => (
       <Link key={link} to={`/Kanbas/Account/${link}`} className={`list-group-item ${active(link)}`}> {link} </Link>
     ))}
     {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
   </div>
);}



// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles.css";
// import { useSelector } from "react-redux";

// export default function AccountNavigation() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
//   const { pathname } = useLocation();

//   // 使用 useState 来存储当前激活的链接
//   const [activeLink, setActiveLink] = useState("/Kanbas/Account/Signin");

//   return (
//     <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
//       <Link to="/Kanbas/Account/Signin"
//         id="wd-account-signin-link"
//         onClick={() => setActiveLink("/Kanbas/Account/Signin")}
//         // 动态设置 active 类名
//         className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Signin" ? "active" : ""}`}>
//         Signin
//       </Link>

//       <Link to="/Kanbas/Account/Signup"
//         id="wd-account-signup-link"
//         onClick={() => setActiveLink("/Kanbas/Account/Signup")}
//         className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Signup" ? "active" : ""}`}>
//         Signup
//       </Link>

//       <Link to="/Kanbas/Account/Profile"
//         id="wd-account-profile-link"
//         onClick={() => setActiveLink("/Kanbas/Account/Profile")}
//         className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Profile" ? "active" : ""}`}>
//         Profile
//       </Link>
//     </div>
//   );
// }
