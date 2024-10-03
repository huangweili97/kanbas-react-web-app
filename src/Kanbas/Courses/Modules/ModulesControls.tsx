import { FaPlus } from "react-icons/fa6";  // 引入图标库
import GreenCheckmark from "./GreenCheckmark";  // 引入绿色对勾的组件
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* 添加模块按钮 */}
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        {/* 加号图标 */}
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>

      {/* 发布按钮及其下拉菜单 */}
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          {/* 绿色对勾图标 */}
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            {/* 发布所有模块和条目 */}
            <a
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            {/* 仅发布模块 */}
            <a
              id="wd-publish-modules-only-button"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            {/* 取消发布所有模块和条目 */}
            <a
              id="wd-unpublish-all-modules-and-items"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Unpublish all modules and items
            </a>
          </li>
          <li>
            {/* 仅取消发布模块 */}
            <a
              id="wd-unpublish-modules-only"
              className="dropdown-item"
              href="#"
            >
              <GreenCheckmark />
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      {/* 查看进度按钮 */}
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-primary me-1 float-end"
      >
        View Progress
      </button>

      {/* 折叠全部按钮 */}
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-warning me-1 float-end"
      >
        Collapse All
      </button>
    </div>
  );
}
