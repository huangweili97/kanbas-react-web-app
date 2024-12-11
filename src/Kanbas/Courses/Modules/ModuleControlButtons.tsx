import { IoEllipsisVertical } from "react-icons/io5"; // Importing vertical ellipsis icon
import { BsPlus } from "react-icons/bs"; // Importing Plus icon from Bootstrap
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  saveModule,
  addLessonToModule,
}: {
  moduleId: any;
  deleteModule: (moduleId: any) => void;
  editModule: (moduleId: any) => void;
  saveModule: (moduleId: any) => void;
  addLessonToModule: (moduleId: any, lessonName: string, lessonDescription: string) => void; // 新增
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
      />
      <span onClick={() => saveModule(moduleId)}>
        <GreenCheckmark />
      </span>

      <BsPlus
        className="fs-4 ms-2"
        onClick={() => {
          const lessonName = prompt("Enter lesson name:");
          const lessonDescription = prompt("Enter lesson description:");
          if (lessonName && lessonDescription) {
            addLessonToModule(moduleId, lessonName, lessonDescription);
          }
        }}
      />

      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
