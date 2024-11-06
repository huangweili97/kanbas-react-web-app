import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll, setEnrollments } from "./Enrollment/reducer";
import { signOut } from "./Account/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.accountReducer?.currentUser || null);
  const enrollments = useSelector((state: any) => state.enrollmentReducer?.enrollments || []);

  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      const savedEnrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
      dispatch(setEnrollments(savedEnrollments));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      localStorage.setItem("enrollments", JSON.stringify(enrollments));
    }
  }, [enrollments, currentUser]);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleToggleCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEnroll = (courseId: string) => {
    dispatch(enroll(courseId));
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenroll(courseId));
  };

  const truncateDescription = (text: string, maxLength: number) => 
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <button className="btn btn-secondary float-end" onClick={handleSignOut}>Sign Out</button>
      <hr />

      {currentUser ? (
        currentUser.role === "STUDENT" ? (
          <>
            <button className="btn btn-primary float-end" onClick={handleToggleCourses}>
              {showAllCourses ? "View Enrolled Courses" : "View All Courses"}
            </button>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {courses
                .filter(course => showAllCourses || enrollments.includes(course._id))
                .map(course => (
                  <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px", marginBottom: "30px" }}>
                    <div className="card h-100 d-flex flex-column">
                      <Link to={enrollments.includes(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"}
                            className="wd-dashboard-course-link text-decoration-none text-dark"
                            onClick={(e) => { if (!enrollments.includes(course._id)) e.preventDefault(); }}>
                        <img src="/images/reactjs.jpg" alt="Course" className="card-img-top" style={{ height: "150px", objectFit: "cover", width: "100%" }} />
                        <div className="card-body d-flex flex-column" style={{ minHeight: "250px" }}>
                          <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                          <p className="wd-dashboard-course-body card-text">
                            {truncateDescription(course.description, 100)}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            {enrollments.includes(course._id) ? (
                              <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); handleUnenroll(course._id); }}>Unenroll</button>
                            ) : (
                              <button className="btn btn-success" onClick={(e) => { e.preventDefault(); handleEnroll(course._id); }}>Enroll</button>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : currentUser.role === "FACULTY" ? (
          <>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <h5>
              New Course
              <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>Add</button>
              <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click">Update</button>
            </h5>
            <br />
            <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
            <hr />
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {courses.map(course => (
                <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px", marginBottom: "30px" }}>
                  <div className="card h-100 d-flex flex-column">
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                      <img src="/images/reactjs.jpg" alt="Course" className="card-img-top" style={{ height: "150px", objectFit: "cover", width: "100%" }} />
                      <div className="card-body d-flex flex-column" style={{ minHeight: "250px" }}>
                        <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                        <p className="wd-dashboard-course-body card-text">
                          {truncateDescription(course.description, 100)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <button className="btn btn-primary">Go</button>
                          <button className="btn btn-warning me-2" onClick={(e) => { e.preventDefault(); setCourse(course); }}>Edit</button>
                          <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); deleteCourse(course._id); }}>Delete</button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Unauthorized access.</p>
        )
      ) : (
        <p>Please sign in to view the dashboard.</p>
      )}
    </div>
  );
}





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";
// import { useDispatch, useSelector } from "react-redux";
// import { enroll, unenroll, setEnrollments } from "./Enrollment/reducer"; // Adjust path as needed
// import { signOut } from "./Account/reducer"; // Adjust path as needed

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
// }) {
//   const dispatch = useDispatch();

//   // Retrieve current user and enrollments from Redux state
//   const currentUser = useSelector(
//     (state: any) => state.accountReducer?.currentUser || null
//   );
//   const enrollments = useSelector(
//     (state: any) => state.enrollmentReducer?.enrollments || []
//   );

//   const [showAllCourses, setShowAllCourses] = useState(false);

//   // Load initial enrollments from local storage if student
//   useEffect(() => {
//     if (currentUser?.role === "STUDENT") {
//       const savedEnrollments = JSON.parse(
//         localStorage.getItem("enrollments") || "[]"
//       );
//       dispatch(setEnrollments(savedEnrollments));
//     }
//   }, [dispatch, currentUser]);

//   // Save enrollments to local storage whenever they change
//   useEffect(() => {
//     if (currentUser?.role === "STUDENT") {
//       localStorage.setItem("enrollments", JSON.stringify(enrollments));
//     }
//   }, [enrollments, currentUser]);

//   const handleSignOut = () => {
//     dispatch(signOut());
//   };

//   const handleToggleCourses = () => {
//     setShowAllCourses(!showAllCourses);
//   };

//   const handleEnroll = (courseId: string) => {
//     dispatch(enroll(courseId));
//   };

//   const handleUnenroll = (courseId: string) => {
//     dispatch(unenroll(courseId));
//   };

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <button className="btn btn-secondary float-end" onClick={handleSignOut}>
//         Sign Out
//       </button>
//       <hr />

//       {currentUser ? (
//         currentUser.role === "STUDENT" ? (
//           // 学生视图
//           <>
//             <button
//               className="btn btn-primary float-end"
//               onClick={handleToggleCourses}
//             >
//               {showAllCourses ? "View Enrolled Courses" : "View All Courses"}
//             </button>
//             <h2 id="wd-dashboard-published">
//               Published Courses ({courses.length})
//             </h2>
//             <hr />
//             <div
//               id="wd-dashboard-courses"
//               className="row row-cols-1 row-cols-md-5 g-4"
//             >
//               {courses
//                 .filter(
//                   (course) => showAllCourses || enrollments.includes(course._id)
//                 )
//                 .map((course) => (
//                   <div
//                     key={course._id}
//                     className="wd-dashboard-course col"
//                     style={{ width: "260px", marginBottom: "30px" }}
//                   >
//                     <div className="card rounded-3 overflow-hidden h-100">
//                       <Link
//                         to={
//                           enrollments.includes(course._id)
//                             ? `/Kanbas/Courses/${course._id}/Home`
//                             : "#"
//                         }
//                         className="wd-dashboard-course-link text-decoration-none text-dark"
//                         onClick={(e) => {
//                           if (!enrollments.includes(course._id))
//                             e.preventDefault();
//                         }}
//                       >
//                         <img
//                           src="/images/reactjs.jpg"
//                           alt="Course"
//                           className="card-img-top"
//                           style={{
//                             height: "150px",
//                             objectFit: "cover",
//                             width: "100%",
//                           }}
//                         />
//                         <div className="card-body">
//                           <h5 className="wd-dashboard-course-title card-title">
//                             {course.name}
//                           </h5>
//                           <p className="wd-dashboard-course-body card-text">
//                             {course.description}
//                           </p>
//                           <div className="d-flex justify-content-between align-items-center mt-auto">
//                             {enrollments.includes(course._id) ? (
//                               <button
//                                 className="btn btn-danger"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   handleUnenroll(course._id);
//                                 }}
//                               >
//                                 Unenroll
//                               </button>
//                             ) : (
//                               <button
//                                 className="btn btn-success"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   handleEnroll(course._id);
//                                 }}
//                               >
//                                 Enroll
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </>
//         ) : currentUser.role === "FACULTY" ? (
//           // 教师视图
//           <>
//             <h2 id="wd-dashboard-published">
//               Published Courses ({courses.length})
//             </h2>
//             <hr />
//             <h5>
//               New Course
//               <button
//                 className="btn btn-primary float-end"
//                 id="wd-add-new-course-click"
//                 onClick={addNewCourse}
//               >
//                 Add
//               </button>
//               <button
//                 className="btn btn-warning float-end me-2"
//                 onClick={updateCourse}
//                 id="wd-update-course-click"
//               >
//                 Update
//               </button>
//             </h5>
//             <br />
//             <input
//               value={course.name}
//               className="form-control mb-2"
//               onChange={(e) => setCourse({ ...course, name: e.target.value })}
//             />
//             <textarea
//               value={course.description}
//               className="form-control"
//               onChange={(e) =>
//                 setCourse({ ...course, description: e.target.value })
//               }
//             />
//             <hr />
//             <div
//               id="wd-dashboard-courses"
//               className="row row-cols-1 row-cols-md-5 g-4"
//             >
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="wd-dashboard-course col"
//                   style={{ width: "260px", marginBottom: "30px" }}
//                 >
//                   <div className="card rounded-3 overflow-hidden h-100">
//                     <Link
//                       to={`/Kanbas/Courses/${course._id}/Home`}
//                       className="wd-dashboard-course-link text-decoration-none text-dark"
//                     >
//                       <img
//                         src="/images/reactjs.jpg"
//                         alt="Course"
//                         className="card-img-top"
//                         style={{
//                           height: "150px",
//                           objectFit: "cover",
//                           width: "100%",
//                         }}
//                       />
//                       <div className="card-body">
//                         <h5 className="wd-dashboard-course-title card-title">
//                           {course.name}
//                         </h5>
//                         <p className="wd-dashboard-course-body card-text">
//                           {course.description}
//                         </p>
//                         <div className="d-flex justify-content-between align-items-center mt-auto">
//                           <button className="btn btn-primary">Go</button>
//                           <button
//                             id="wd-edit-course-click"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setCourse(course);
//                             }}
//                             className="btn btn-warning me-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.preventDefault();
//                               deleteCourse(course._id);
//                             }}
//                             className="btn btn-danger"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p>Unauthorized access.</p>
//         )
//       ) : (
//         <p>Please sign in to view the dashboard.</p>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";
// import * as db from "./Database";
// import { useSelector } from "react-redux";
// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = db;

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//       </h2>{" "}
//       <hr />
//       <h5>
//         New Course
//         <button
//           className="btn btn-primary float-end"
//           id="wd-add-new-course-click"
//           onClick={addNewCourse}
//         >
//           {" "}
//           Add{" "}
//         </button>
//         <button
//           className="btn btn-warning float-end me-2"
//           onClick={updateCourse}
//           id="wd-update-course-click"
//         >
//           Update
//         </button>
//       </h5>
//       <br />
//       <input
//         value={course.name}
//         className="form-control mb-2"
//         onChange={(e) => setCourse({ ...course, name: e.target.value })}
//       />
//       <textarea
//         value={course.description}
//         className="form-control"
//         onChange={(e) => setCourse({ ...course, description: e.target.value })}
//       />
//       <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses
//             .filter((course) =>
//               enrollments.some(
//                 (enrollment) =>
//                   enrollment.user === currentUser._id &&
//                   enrollment.course === course._id
//               )
//             )
//             .map((course) => (
//               <div
//                 key={course._id}
//                 className="wd-dashboard-course col"
//                 style={{ width: "300px" }}
//               >
//                 <div className="card rounded-3 overflow-hidden">
//                   <Link
//                     to={`/Kanbas/Courses/${course._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     <img src="/images/reactjs.jpg" width="100%" height={160} />
//                     <div className="card-body">
//                       <h5 className="wd-dashboard-course-title card-title">
//                         {course.name}{" "}
//                       </h5>
//                       <p
//                         className="wd-dashboard-course-body card-text overflow-y-hidden"
//                         style={{ maxHeight: 100 }}
//                       >
//                         {course.description}{" "}
//                       </p>

//                       <div className="d-flex justify-content-between align-items-center">
//                         <button className="btn btn-primary"> Go </button>

//                         <button
//                           id="wd-edit-course-click"
//                           onClick={(event) => {
//                             event.preventDefault();
//                             setCourse(course);
//                           }}
//                           className="btn btn-warning me-2 float-end"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={(event) => {
//                             event.preventDefault();
//                             deleteCourse(course._id);
//                           }}
//                           className="btn btn-danger float-end"
//                           id="wd-delete-course-click"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";
// import { useDispatch, useSelector } from "react-redux";
// import { enroll, unenroll, setEnrollments } from "./Enrollment/reducer"; // Adjust path as needed
// import { signOut } from "./Account/reducer"; // Adjust path as needed

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: () => void;
// }) {
//   const dispatch = useDispatch();

//   // Retrieve current user and enrollments from Redux state
//   const currentUser = useSelector((state: any) => state.accountReducer?.currentUser || null);
//   const enrollments = useSelector((state: any) => state.enrollmentReducer?.enrollments || []);
//   const [showAllCourses, setShowAllCourses] = useState(false);

//   // Check if the current user is a student
//   const isStudent = currentUser && currentUser.role === "STUDENT";

//   // Toggle between showing all courses and enrolled courses
//   const handleToggleCourses = () => {
//     setShowAllCourses(!showAllCourses);
//   };

//   // Enroll in a course
//   const handleEnroll = (courseId: string) => {
//     dispatch(enroll(courseId));
//   };

//   // Unenroll from a course
//   const handleUnenroll = (courseId: string) => {
//     dispatch(unenroll(courseId));
//   };

//   // Sign out
//   const handleSignOut = () => {
//     dispatch(signOut());
//   };

//   // Load initial enrollments if available
//   useEffect(() => {
//     if (isStudent) {
//       // Simulate loading enrollments from persisted data on initial load
//       const savedEnrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
//       dispatch(setEnrollments(savedEnrollments));
//     }
//   }, [dispatch, isStudent]);

//   // Save enrollments to local storage whenever they change
//   useEffect(() => {
//     if (isStudent) {
//       localStorage.setItem("enrollments", JSON.stringify(enrollments));
//     }
//   }, [enrollments, isStudent]);

//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />

//       {currentUser ? (
//         <>
//           {isStudent && (
//             <button
//               className="btn btn-primary float-end"
//               onClick={handleToggleCourses}
//             >
//               {showAllCourses ? "View Enrolled Courses" : "View All Courses"}
//             </button>
//           )}
//           <button className="btn btn-secondary float-end me-2" onClick={handleSignOut}>
//             Sign Out
//           </button>

//           <h2 id="wd-dashboard-published">
//             Published Courses ({courses.length})
//           </h2>
//           <hr />

//           {currentUser.role === "FACULTY" && (
//             <>
//               <h5>
//                 New Course
//                 <button
//                   className="btn btn-primary float-end"
//                   id="wd-add-new-course-click"
//                   onClick={addNewCourse}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="btn btn-warning float-end me-2"
//                   onClick={updateCourse}
//                   id="wd-update-course-click"
//                 >
//                   Update
//                 </button>
//               </h5>
//               <br />
//               <input
//                 value={course.name}
//                 className="form-control mb-2"
//                 onChange={(e) => setCourse({ ...course, name: e.target.value })}
//               />
//               <textarea
//                 value={course.description}
//                 className="form-control"
//                 onChange={(e) => setCourse({ ...course, description: e.target.value })}
//               />
//             </>
//           )}

//           <hr />
//           <div id="wd-dashboard-courses" className="row">
//             <div className="row row-cols-1 row-cols-md-5 g-4">
//               {courses
//                 .filter((course) =>
//                   showAllCourses || (isStudent && enrollments.includes(course._id))
//                 )
//                 .map((course) => (
//                   <div
//                     key={course._id}
//                     className="wd-dashboard-course col"
//                     style={{ width: "300px" }}
//                   >
//                     <div className="card rounded-3 overflow-hidden">
//                       <Link
//                         to={isStudent && enrollments.includes(course._id) ? `/Kanbas/Courses/${course._id}/Home` : "#"}
//                         className="wd-dashboard-course-link text-decoration-none text-dark"
//                         onClick={(e) => {
//                           if (!isStudent || !enrollments.includes(course._id)) {
//                             e.preventDefault();
//                           }
//                         }}
//                       >
//                         <img src="/images/reactjs.jpg" width="100%" height={160} />
//                         <div className="card-body">
//                           <h5 className="wd-dashboard-course-title card-title">
//                             {course.name}
//                           </h5>
//                           <p
//                             className="wd-dashboard-course-body card-text overflow-y-hidden"
//                             style={{ maxHeight: 100 }}
//                           >
//                             {course.description}
//                           </p>
//                           {isStudent && (
//                             <div className="d-flex justify-content-between align-items-center">
//                               {enrollments.includes(course._id) ? (
//                                 <button
//                                   className="btn btn-danger"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     handleUnenroll(course._id);
//                                   }}
//                                 >
//                                   Unenroll
//                                 </button>
//                               ) : (
//                                 <button
//                                   className="btn btn-success"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     handleEnroll(course._id);
//                                   }}
//                                 >
//                                   Enroll
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         <p>Please sign in to view the dashboard.</p>
//       )}
//     </div>
//   );
// }
