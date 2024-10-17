import React from "react";
import Labs from "./Labs";
import Kanbas from './Kanbas';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';



export default function App() {
  return (
   <HashRouter>
    <div>
     <Routes>
      <Route path="/" element={<Navigate to="Labs"/>}/>
      <Route path="/Labs/*" element={<Labs />} />
      <Route path="/Kanbas/*" element={<Kanbas />} />
      
     </Routes>
    </div>
   </HashRouter>
 );}


 // HashRouter 这是 App 组件的根组件，它将 Routes 包裹起来，使得路由系统可以通过 URL 中的哈希部分来工作。
 // 哈希路由的 URL 形如 http://localhost:3000/#/Labs，HashRouter 将基于 # 后面的路径匹配路由。
 // Routes 组件负责定义可匹配的路由列表。它包含多个 Route，每个 Route 都定义了一个 URL 和对应的组件
 // <Route path="/" element={<Navigate to="Labs"/>}/>：
 // 当用户访问 / 路径（根路径）时，这个 Route 会触发 Navigate 组件，将用户自动重定向到 /Labs。
 // Navigate 是用于替换旧版本中的 Redirect。
