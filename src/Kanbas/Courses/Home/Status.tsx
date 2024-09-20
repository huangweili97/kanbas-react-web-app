export default function CourseStatus() {
    return (
        <div id="wd-course-status">
            <h2>Course Status</h2>

            <table>
                <tr>
                    <button>Unpublish</button><button>Publish</button>
                </tr>
                <br/>
                <tr>
                    <td colSpan={2}><button>Import Existing Content</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>Import from Commons</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>Choose Home Page</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>View Course Stream</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>New Announcement</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>New Analytics</button></td>
                </tr>
                <tr>
                    <td colSpan={2}><button>View Course Notifications</button></td>
                </tr>
            </table>
        </div>
    );
}