export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            
            <textarea id="wd-description">
                The assignment is available online. Submit a link to the landing page of the project.
                This project involves a deep dive into environmental studies and HTML usage.
                Ensure that all materials are uploaded properly and that the work submitted is original.
                Please follow the guidelines as described in the syllabus. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Quis et blanditiis minima, voluptas corrupti quod repudiandae nam assumenda 
                ab labore numquam earum iusto unde tenetur architecto corporis magnam rerum magni.
            </textarea>
            <br /><br />
            
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="PERCENTAGE">Percentage</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option value="ONLINE">Online</option>
                        </select>
                    </td>
                </tr>
                
                <br />
                
                <tr>
                    <td colSpan={2}>
                        <label>Online Entry Options:</label><br />
                        <input type="checkbox" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>

                <br />
                <tr>
                    <td align="right" valign="top">
                        <label>Assign</label>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="wd-assign-to">Assign to</label><br />
                                    <input id="wd-assign-to" value="Everyone" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="wd-due-date">Due</label><br />
                                    <input type="date" id="wd-due-date" value="2024-05-13" /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="wd-available-from">Available From</label><br />
                                    <input type="date" id="wd-available-from" value="2024-05-06" />
                                </td>
                                <td>
                                    <label htmlFor="wd-available-until">Until</label><br />
                                    <input type="date" id="wd-available-until" value="2024-05-20" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            
            <hr />

            <div style={{ textAlign: 'right' }}>
                <button>Cancel</button>
                <button>Safe</button>
            </div>
        </div>
    );
}
