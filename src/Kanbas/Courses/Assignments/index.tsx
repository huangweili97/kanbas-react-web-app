import React from "react";
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";
import AssignmentListItemA1 from "./AssignmentListItemA1";
import AssignmentListItemA2 from "./AssignmentListItemA2";
import AssignmentListItemA3 from "./AssignmentListItemA3";
import { BsGripVertical } from "react-icons/bs"; // 8点图标
import { IoEllipsisVertical } from "react-icons/io5"; // 右侧三个点的图标
import { FaCaretDown } from "react-icons/fa"; // 黑色倒三角图标
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css"; // Assuming shared styles
import { MdPortableWifiOff } from "react-icons/md";

export default function Assignments() {
    return (
        <div id="wd-assignments" className="p-3">
            {/* 搜索框部分 */}
            <SearchBar />

            {/* 按钮部分 */}
            <AssignmentButtons />

            {/* 作业标题 */}
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
                {/* 左侧的8点图标 */}
                <BsGripVertical className="me-2 fs-3" />
                
                {/* ASSIGNMENTS 标题左边的黑色倒三角图标 */}
                <FaCaretDown className="me-2 fs-4" />
                
                <h3 className="me-auto mb-0">ASSIGNMENTS</h3>

                {/* 右侧的按钮和图标 */}
                <button className="btn btn-sm btn-light rounded-pill me-2">
                    40% of Total
                </button>
                <button className="btn btn-sm btn-light me-2">
                    +
                </button>
                <IoEllipsisVertical className="fs-4 ms-2" />
            </div>

            {/* 作业列表 */}
            <ul id="wd-assignment-list" className="list-group">
                <AssignmentListItemA1 />
                <AssignmentListItemA2 />
                <AssignmentListItemA3 />
            </ul>
        </div>
    );
}
