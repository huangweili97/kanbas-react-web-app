import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
  const [description, setDescription] = useState(
    `The assignment is available online. Submit a link to the landing page of the project.
This project involves a deep dive into environmental studies and HTML usage.
Ensure that all materials are uploaded properly and that the work submitted is original.
Please follow the guidelines as described in the syllabus.`
  );

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      
      {/* Assignment Name */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        </div>
        <div className="col-sm-12">
          <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
        </div>
      </div>

      {/* Description without label */}
      <div className="row mb-3">
        <div className="col-sm-12">
          <textarea 
            id="wd-description" 
            className="form-control" 
            rows={5} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
      </div>

      {/* Submission Type Section */}
      <div className="row mb-3">
        <div className="d-flex align-items-start w-100">
          <label className="form-label fw-bold me-2" style={{ backgroundColor: 'white', padding: '0 5px' }}>Submission Type</label> {/* 标签紧贴框框 */}
          <div className="p-3 border rounded flex-grow-1 w-100"> {/* 使用 w-100 确保宽度一致 */}
            
            {/* Submission Type */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-submission-type" className="form-label fw-bold">Submission Type</label>
                <select id="wd-submission-type" className="form-control">
                  <option value="ONLINE">Online</option>
                </select>
              </div>
            </div>

            {/* Online Entry Options */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label className="form-label fw-bold">Online Entry Options</label> {/* 字体加粗 */}
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                  <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-website-url" />
                  <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                  <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                  <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                  <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Section */}
      <div className="row mb-3">
        <div className="d-flex align-items-start w-100">
          <label className="form-label fw-bold me-2" style={{ backgroundColor: 'white', padding: '0 5px' }}>Assign</label> {/* 标签紧贴框框 */}
          <div className="p-3 border rounded flex-grow-1 w-100"> {/* 使用 w-100 确保宽度一致 */}
            
            {/* Assign To */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label> {/* 字体加粗 */}
                <input id="wd-assign-to" className="form-control" value="Everyone" />
              </div>
            </div>

            {/* Due */}
            <div className="row mb-3">
              <div className="col-sm-12">
                <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label> {/* 字体加粗 */}
                <input type="date" id="wd-due-date" className="form-control" value="2024-05-13" />
              </div>
            </div>

            {/* Available From and Until */}
            <div className="row mb-3">
              <div className="col-sm-6">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available From</label> {/* 字体加粗 */}
                <input type="date" id="wd-available-from" className="form-control" value="2024-05-06" />
              </div>
              <div className="col-sm-6">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label> {/* 字体加粗 */}
                <input type="date" id="wd-available-until" className="form-control" value="2024-05-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-success">Save</button>
      </div>
    </div>
  );
}






{/* // </div>export default function AssignmentEditor() {
//     return (
//         <div id="wd-assignments-editor">
//             <label htmlFor="wd-name">Assignment Name</label>
//             <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            
//             <textarea id="wd-description">
//                 The assignment is available online. Submit a link to the landing page of the project.
//                 This project involves a deep dive into environmental studies and HTML usage.
//                 Ensure that all materials are uploaded properly and that the work submitted is original.
//                 Please follow the guidelines as described in the syllabus. Lorem ipsum dolor sit, amet consectetur
//                 adipisicing elit. Quis et blanditiis minima, voluptas corrupti quod repudiandae nam assumenda 
//                 ab labore numquam earum iusto unde tenetur architecto corporis magnam rerum magni.
//             </textarea>
//             <br /><br />
            
//             <table>
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-points">Points</label>
//                     </td>
//                     <td>
//                         <input id="wd-points" value={100} />
//                     </td>
//                 </tr>
//                 <br />
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-group">Assignment Group</label>
//                     </td>
//                     <td>
//                         <select id="wd-group">
//                             <option value="ASSIGNMENTS">ASSIGNMENTS</option>
//                         </select>
//                     </td>
//                 </tr>
//                 <br />
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-display-grade-as">Display Grade as</label>
//                     </td>
//                     <td>
//                         <select id="wd-display-grade-as">
//                             <option value="PERCENTAGE">Percentage</option>
//                         </select>
//                     </td>
//                 </tr>
//                 <br />
//                 <tr>
//                     <td align="right" valign="top">
//                         <label htmlFor="wd-submission-type">Submission Type</label>
//                     </td>
//                     <td>
//                         <select id="wd-submission-type">
//                             <option value="ONLINE">Online</option>
//                         </select>
//                     </td>
//                 </tr>
                
//                 <br />
                
//                 <tr>
//                     <td colSpan={2}>
//                         <label>Online Entry Options:</label><br />
//                         <input type="checkbox" id="wd-text-entry" />
//                         <label htmlFor="wd-text-entry">Text Entry</label><br />

//                         <input type="checkbox" id="wd-website-url" />
//                         <label htmlFor="wd-website-url">Website URL</label><br />

//                         <input type="checkbox" id="wd-media-recordings" />
//                         <label htmlFor="wd-media-recordings">Media Recordings</label><br />

//                         <input type="checkbox" id="wd-student-annotation" />
//                         <label htmlFor="wd-student-annotation">Student Annotation</label><br />

//                         <input type="checkbox" id="wd-file-upload" />
//                         <label htmlFor="wd-file-upload">File Uploads</label>
//                     </td>
//                 </tr>

//                 <br />
//                 <tr>
//                     <td align="right" valign="top">
//                         <label>Assign</label>
//                     </td>
//                     <td>
//                         <table>
//                             <tr>
//                                 <td>
//                                     <label htmlFor="wd-assign-to">Assign to</label><br />
//                                     <input id="wd-assign-to" value="Everyone" />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <label htmlFor="wd-due-date">Due</label><br />
//                                     <input type="date" id="wd-due-date" value="2024-05-13" /><br />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <label htmlFor="wd-available-from">Available From</label><br />
//                                     <input type="date" id="wd-available-from" value="2024-05-06" />
//                                 </td>
//                                 <td>
//                                     <label htmlFor="wd-available-until">Until</label><br />
//                                     <input type="date" id="wd-available-until" value="2024-05-20" />
//                                 </td>
//                             </tr>
//                         </table>
//                     </td>
//                 </tr>
//             </table>
            
//             <hr />

//             <div style={{ textAlign: 'right' }}>
//                 <button>Cancel</button>
//                 <button>Safe</button>
//             </div>
//         </div>
//     );
// } */}
