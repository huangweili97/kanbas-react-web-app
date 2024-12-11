import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll, setEnrollments } from "./Enrollment/reducer";
import { signOut } from "./Account/reducer";
import * as AccountClient from "./Account/client";
import { RootState } from "./store";
import { Course, User } from "./types";

interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course>>;
  addNewCourse: () => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: () => Promise<void>;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: DashboardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  const enrollments = useSelector(
    (state: RootState) => state.enrollmentReducer?.enrollments || []
  ) as string[];

  // Load enrolled courses for students
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (currentUser?.role === "STUDENT") {
        try {
          const enrolledCourses = await AccountClient.findCoursesForUser(
            currentUser._id
          );

          // 过滤掉 null 值
          const filteredCourses = enrolledCourses.filter(
            (course: Course | null) => course !== null
          );

          const enrolledIds = filteredCourses.map((course: Course) => course._id);
          dispatch(setEnrollments(enrolledIds));
        } catch (error) {
          console.error("Error fetching enrollments:", error);
        }
      }
    };

    fetchEnrollments();
  }, [currentUser, dispatch]);

  const handleSignOut = async () => {
    try {
      await AccountClient.signout();
      dispatch(signOut());
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEnrollmentChange = async (
    courseId: string,
    isEnrolled: boolean
  ) => {
    if (!currentUser) return;
    try {
      if (isEnrolled) {
        await AccountClient.unenrollFromCourse(currentUser._id, courseId);
        dispatch(unenroll(courseId));
      } else {
        await AccountClient.enrollIntoCourse(currentUser._id, courseId);
        dispatch(enroll(courseId));
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const truncateDescription = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  if (!currentUser) {
    return <p>Please sign in to view the dashboard.</p>;
  }

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        Dashboard
        {currentUser.role === "STUDENT" && (
          <div className="d-flex">
            <button
              onClick={() => setEnrolling(!enrolling)}
              className="btn btn-primary me-2"
            >
              {enrolling ? "My Courses" : "All Courses"}
            </button>
            <button className="btn btn-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </h1>

      <hr />
      {currentUser.role === "STUDENT" ? (
        <>
          <h2 id="wd-dashboard-published">
            {enrolling ? "All Courses" : "My Enrolled Courses"} (
            {
              courses.filter(
                (course) => enrolling || enrollments.includes(course?._id)
              ).length
            }
            )
          </h2>
          <hr />
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses
              .filter(
                (course) => enrolling || enrollments.includes(course?._id)
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
                                handleEnrollmentChange(course._id, true);
                              }}
                            >
                              Unenroll
                            </button>
                          ) : (
                            enrolling && (
                              <button
                                className="btn btn-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEnrollmentChange(course._id, false);
                                }}
                              >
                                Enroll
                              </button>
                            )
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 id="wd-dashboard-published">
              Published Courses ({courses.length})
            </h2>
            <button className="btn btn-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>

          <hr />
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
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
                  </Link>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ minHeight: "150px" }}
                  >
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-body card-text">
                      {truncateDescription(course.description, 100)}
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-stretch p-3"
                    style={{ marginTop: "auto" }}
                  >
                    <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                      <button className="btn btn-primary btn-sm mb-2 w-100">
                        Go
                      </button>
                    </Link>

                    <button
                      className="btn btn-warning btn-sm mb-2 w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
