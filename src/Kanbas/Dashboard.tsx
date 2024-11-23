// Dashboard.tsx

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  enroll,
  unenroll,
  setEnrollments,
} from "./Enrollment/reducer";
import { signOut } from "./Account/reducer";
import * as EnrollmentClient from "./Enrollment/client";
import * as AccountClient from "./Account/client";
import { RootState } from "./store";
import { Course, User } from "./types"; // 导入共享类型

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  addNewCourse: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: () => Promise<void>;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  const enrollments = useSelector(
    (state: RootState) => state.enrollmentReducer?.enrollments || []
  ) as string[];

  const [showAllCourses, setShowAllCourses] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await AccountClient.signout();
      dispatch(signOut());
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleToggleCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const fetchEnrollments = async () => {
    if (currentUser && currentUser.role === "STUDENT") {
      try {
        const enrollmentsData = await EnrollmentClient.findEnrollmentsForUser(
          currentUser._id
        );
        const enrolledCourseIds = enrollmentsData.map(
          (enrollment: any) => enrollment.course
        );
        console.log("Fetched enrollments:", enrolledCourseIds);

        dispatch(setEnrollments(enrolledCourseIds));
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await EnrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      await fetchEnrollments();
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await EnrollmentClient.unenrollUserFromCourse(
        currentUser._id,
        courseId
      );
      await fetchEnrollments();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  const truncateDescription = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  if (!currentUser) {
    return <p>Please sign in to view the dashboard.</p>;
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <button className="btn btn-secondary float-end" onClick={handleSignOut}>
        Sign Out
      </button>
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end me-2"
          onClick={handleToggleCourses}
        >
          {showAllCourses ? "View Enrolled Courses" : "View All Courses"}
        </button>
      )}
      <hr />
      {currentUser.role === "STUDENT" ? (
        <>
          <h2 id="wd-dashboard-published">
            {showAllCourses ? "All Courses" : "Enrolled Courses"} (
            {
              courses.filter(
                (course) =>
                  showAllCourses || enrollments.includes(course._id)
              ).length
            }
            )
          </h2>
          <hr />
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses
              .filter(
                (course) =>
                  showAllCourses || enrollments.includes(course._id)
              )
              .map((course) => (
                <div
                  key={course._id}
                  className="wd-dashboard-course col"
                  style={{ width: "260px", marginBottom: "30px" }}
                >
                  <div className="card h-100 d-flex flex-column">
                    <Link
                      to={
                        enrollments.includes(course._id)
                          ? `/Kanbas/Courses/${course._id}/Home`
                          : "#"
                      }
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                      onClick={(e) => {
                        if (!enrollments.includes(course._id))
                          e.preventDefault();
                      }}
                    >
                      <img
                        src="/images/reactjs.jpg"
                        alt="Course"
                        className="card-img-top"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <div
                        className="card-body d-flex flex-column"
                        style={{ minHeight: "250px" }}
                      >
                        <h5 className="wd-dashboard-course-title card-title">
                          {course.name}
                        </h5>
                        <p className="wd-dashboard-course-body card-text">
                          {truncateDescription(course.description, 100)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          {enrollments.includes(course._id) ? (
                            <button
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEnroll(course._id);
                              }}
                            >
                              Enroll
                            </button>
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
          <h2 id="wd-dashboard-published">
            Published Courses ({courses.length})
          </h2>
          <hr />
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />

          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "260px", marginBottom: "30px" }}
              >
                <div className="card h-100 d-flex flex-column">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src="/images/reactjs.jpg"
                      alt="Course"
                      className="card-img-top"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div
                      className="card-body d-flex flex-column"
                      style={{ minHeight: "250px" }}
                    >
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p className="wd-dashboard-course-body card-text">
                        {truncateDescription(course.description, 100)}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <button className="btn btn-primary">Go</button>
                        <button
                          className="btn btn-warning me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteCourse(course._id);
                          }}
                        >
                          Delete
                        </button>
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
      )}
    </div>
  );
}
