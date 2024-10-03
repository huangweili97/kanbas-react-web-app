import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.createRoot 是 React 18 中的一个 API，用来创建应用的根渲染容器
// document.getElementById('root') 查找 HTML 文件中 ID 为 'root' 的 DOM 元素
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//调用 render 方法，将 App 组件渲染到上面获取的根节点中。
root.render(
  // React.StrictMode 是一个工具，用于在开发环境中帮助检测潜在问题
  // <App /> 是根组件，它包含应用的主要内容。这个组件会被渲染到 DOM 中的 root 元素下
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
