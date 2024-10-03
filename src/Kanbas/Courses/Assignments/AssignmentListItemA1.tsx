import React from "react";
import { BsGripVertical } from "react-icons/bs"; // 8点图标
import { IoEllipsisVertical } from "react-icons/io5"; // 右侧三个点的图标
import { FaClipboard } from "react-icons/fa"; // 绿色记事板图标
import GreenCheckmark from "./GreenCheckmark"; // 引入绿色勾

export default function AssignmentListItemA1() {
    return (
        <li className="wd-assignment-list-item list-group-item d-flex align-items-start p-3 border-start border-success">
            {/* 左侧的8点图标 */}
            <BsGripVertical className="me-2 fs-3" />
            
            {/* 绿色记事板图标 */}
            <FaClipboard className="text-success me-2 fs-4" />
            
            <div className="ms-2 me-auto">
                <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/123">
                    A1 - ENV + HTML
                </a>
                <p className="mb-1">
                    <span className="text-danger">Multiple Modules</span> | <strong>Not available</strong> until May 6 at 12:00am
                </p>
                <p className="mb-0">
                    <strong>Due</strong> May 13 at 11:59pm | 100pts
                </p>
            </div>

            {/* 右侧的绿色勾和三个点 */}
            <div className="float-end">
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4 ms-2" />
            </div>
        </li>
    );
}
