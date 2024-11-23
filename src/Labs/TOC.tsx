import { useLocation } from "react-router";
export default function TOC() {
    // useLocation 是 React Router 提供的一个钩子，用来获取当前页面的路径信息
    // 如果当前路径是 http://localhost:3000/#/Labs/Lab1，
    // pathname 的值是 /Labs/Lab1
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills" id="wd-toc">
      <li className="nav-item"><a id="wd-a"  href="#/Labs" className="nav-link">Labs</a></li>
      <li className="nav-item"><a id="wd-a1" href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</a></li>
      <li className="nav-item"><a id="wd-a2" href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</a></li>
      <li className="nav-item"><a id="wd-a3" href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</a></li>
       <li className="nav-item"><a id="wd-a4" href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}>Lab 4</a></li>
      <li className="nav-item"><a id="wd-a5" href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}>Lab 5</a></li>
      <li className="nav-item"><a id="wd-k" href="#/Kanbas" className="nav-link">Kanbas</a></li>
      <li className="nav-item"><a id="wd-github" href="https://github.com/huangweili97/kanbas-react-web-app.git" target="_blank"
          className="nav-link">My GitHub</a></li>

    </ul>
);}

// nav-link 是基础的 className，表示该元素会应用 nav-link 的样式。
// ${pathname.includes("Lab4") ? "active" : ""} 是一个 JavaScript 表达式，
// 意思是：如果 pathname 包含 Lab4，那么会为这个链接再加上 active 类，使其显示为激活状态；否则，保持不变。

