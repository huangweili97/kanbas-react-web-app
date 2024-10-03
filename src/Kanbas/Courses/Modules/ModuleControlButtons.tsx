import { IoEllipsisVertical } from "react-icons/io5"; // Importing vertical ellipsis icon
import { BsPlus } from "react-icons/bs";  // Importing Plus icon from Bootstrap
import GreenCheckmark from "./GreenCheckmark";  

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-4 ms-2" /> {/* Added Plus icon with a little left margin */}
      <IoEllipsisVertical className="fs-4 ms-2" /> {/* Vertical ellipsis */}
    </div>
  );
}
