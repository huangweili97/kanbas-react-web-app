import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function AccountNavigation() {
  // 使用 useState 来存储当前激活的链接
  const [activeLink, setActiveLink] = useState("/Kanbas/Account/Signin");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Account/Signin"
        id="wd-account-signin-link"
        onClick={() => setActiveLink("/Kanbas/Account/Signin")}
        // 动态设置 active 类名
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Signin" ? "active" : ""}`}>
        Signin
      </Link>

      <Link to="/Kanbas/Account/Signup"
        id="wd-account-signup-link"
        onClick={() => setActiveLink("/Kanbas/Account/Signup")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Signup" ? "active" : ""}`}>
        Signup
      </Link>

      <Link to="/Kanbas/Account/Profile"
        id="wd-account-profile-link"
        onClick={() => setActiveLink("/Kanbas/Account/Profile")}
        className={`list-group-item border-0 ${activeLink === "/Kanbas/Account/Profile" ? "active" : ""}`}>
        Profile
      </Link>
    </div>
  );
}
