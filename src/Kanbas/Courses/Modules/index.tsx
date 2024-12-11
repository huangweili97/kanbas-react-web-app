import { useParams } from "react-router";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import { useState, useEffect } from "react";
import * as modulesClient from "./client";
import * as coursesClient from "../client";

export default function Modules() {
  const { cid } = useParams(); // 从 URL 中获取 courseId
  const { modules } = useSelector((state: any) => state.modulesReducer); // 从 Redux 中获取模块列表
  const dispatch = useDispatch();

  const [moduleName, setModuleName] = useState(""); // 新模块的名称
  const [moduleDescription, setModuleDescription] = useState("");

  // 删除模块
  const removeModule = async (moduleId: any) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  // 保存模块
  // Function to handle saving changes
  const saveModule = async (module: any) => {
    try {
      await modulesClient.updateModule(module); // Save module to the server
      dispatch(updateModule({ ...module, editing: false })); // Update in Redux and stop editing
    } catch (error) {
      console.error("Failed to save module:", error);
    }
  };

  const createModuleForCourse = async () => {
    if (!cid) return; // 如果 courseId 不存在，直接返回
    const newModule = { name: moduleName, description: moduleDescription }; // 包含 description
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
    setModuleName(""); // 清空输入框
    setModuleDescription(""); // 清空描述输入框
  };

  const addLessonToModule = async (
    moduleId: any,
    lessonName: string,
    lessonDescription: string
  ) => {
    try {
      console.log(
        "input information to add lesson",
        moduleId,
        lessonName,
        lessonDescription
      );
      const module = modules.find((mod: any) => mod._id === moduleId);
      if (!module) return;
      console.log("module information ", module);

      const newLessonId = `${module.name}-L${module.lessons.length + 1}`;
      const newLesson = {
        id: newLessonId,
        name: lessonName,
        description: lessonDescription,
      };
      console.log("new lesson:", newLesson);

      // 将新的 lesson 添加到后端数据库
      await modulesClient.addLesson(moduleId, newLesson);

      // 更新 Redux 中的模块状态
      const updatedModule = {
        ...module,
        lessons: [...module.lessons, newLesson],
      };
      console.log("updated module:", updatedModule);
      dispatch(updateModule(updatedModule));
    } catch (error) {
      console.error("Failed to add lesson:", error);
    }
  };

  // 获取模块列表
  const fetchModules = async () => {
    if (!cid) return; // 如果 courseId 不存在，直接返回
    try {
      const modules = await coursesClient.findModulesForCourse(cid); // 使用 courseId 查找模块
      dispatch(setModules(modules));
    } catch (e) {
      console.log(e);
    }
  };

  // 初始化加载：加载模块
  useEffect(() => {
    if (cid) {
      fetchModules(); // 加载模块
    }
  }, [cid]);

  return (
    <div>
      {/* 页面顶部的控制按钮 */}
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse}
        setModuleDescription={setModuleDescription}
      />
      <br />
      <br />
      <br />
      <br />

      {/* 动态加载的模块 */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((module: any) => (
          <li
            key={module._id}
            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  autoFocus // 自动聚焦到输入框
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
                saveModule={() => saveModule(module)}
                addLessonToModule={addLessonToModule} // 新增
              />
            </div>

            <ul className="wd-lessons list-group rounded-0">
              {module.lessons &&
                module.lessons.map((lesson: any) => (
                  <li
                    key={lesson._id}
                    className="wd-lesson list-group-item p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
