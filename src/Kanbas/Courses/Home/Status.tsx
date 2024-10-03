import { MdDoNotDisturbAlt } from "react-icons/md"; // Unpublish Icon
import { FaCheckCircle } from "react-icons/fa";     // Publish Icon
import { BiImport } from "react-icons/bi";          // Import Existing Content Icon
import { LiaFileImportSolid } from "react-icons/lia"; // Import from Commons Icon
import { BsHouseDoor, BsBarChart, BsBell } from "react-icons/bs"; // New Icons
import { GrAnnounce } from "react-icons/gr"; // Announcement Icon

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </button>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsHouseDoor className="me-2 fs-5" /> Choose Home Page
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsBarChart className="me-2 fs-5" /> View Course Stream
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <GrAnnounce className="me-2 fs-5" /> New Announcement
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsBarChart className="me-2 fs-5" /> New Analytics
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsBell className="me-2 fs-5" /> View Course Notifications
      </button>
    </div>
  );
}


// export default function CourseStatus() {
//     return (
//         <div id="wd-course-status">
//             <h2>Course Status</h2>

//             <table>
//                 <tr>
//                     <button>Unpublish</button><button>Publish</button>
//                 </tr>
//                 <br/>
//                 <tr>
//                     <td colSpan={2}><button>Import Existing Content</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>Import from Commons</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>Choose Home Page</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>View Course Stream</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>New Announcement</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>New Analytics</button></td>
//                 </tr>
//                 <tr>
//                     <td colSpan={2}><button>View Course Notifications</button></td>
//                 </tr>
//             </table>
//         </div>
//     );
// }