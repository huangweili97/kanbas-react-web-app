import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="d-flex align-items-center mb-3">
            <FaSearch className="me-2 fs-5" />
            <input 
                id="wd-search-assignment" 
                placeholder="Search for Assignments" 
                className="form-control me-auto"
                style={{ maxWidth: "300px" }} // 限制搜索框宽度
            />
        </div>
    );
}

