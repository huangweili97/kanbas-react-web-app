import { useParams } from "react-router";
import * as db from "../../Database";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs"; // Importing Grip
import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Modules() {
  const { cid } = useParams(); // 获取课程 ID
  const modules = db.modules;  // 从 modules.json 获取模块数据

  return (
    <div>
      {/* 1. 保留页面上的顶部控制按钮，如 "Publish All" */}
      <ModulesControls />
      <br /><br /><br /><br />

      {/* 2. 动态加载的模块 */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module) => module.course === cid) // 根据课程 ID 筛选模块
          .map((module) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> 
                {module.name} {/* 模块名称 */}
                <ModuleControlButtons /> {/* 模块控制按钮 */}
              </div>
              
              {/* 如果模块有 lessons，遍历显示每个 lesson */}
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson) => (
                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> 
                      {lesson.name} {/* 课程名称 */}
                      <LessonControlButtons /> {/* 课程控制按钮 */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
