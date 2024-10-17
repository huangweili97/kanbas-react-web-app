import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs() {
    return (
        <div>
            <h1>Weili Huang</h1>
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Labs" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />         
                <Route path="Lab3/*" element={<Lab3 />} />
            </Routes>
        </div>
    );
}

// 在 react-router 中，* 用于匹配任意子路径。也就是说
// Lab3/* 可以匹配所有以 /Lab3/ 开头的路径，不管后面跟着什么内容