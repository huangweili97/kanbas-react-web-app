import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as EnrollmentClient from "./Enrollment/client";

import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector, useDispatch } from "react-redux";
import { setEnrollments } from "./Enrollment/reducer";
import { RootState } from "./store";
import { Course, User } from "./types"; // 导入共享类型

export default function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as User | null;
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
      setCourse({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
      setCourse({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
      });
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();

      let fetchedCourses = allCourses;

      if (currentUser?.role === "STUDENT") {
        const enrollmentsData = await EnrollmentClient.findEnrollmentsForUser(
          currentUser._id
        );
        const enrolledCourseIds = enrollmentsData.map(
          (enrollment: any) => enrollment.course
        );

        dispatch(setEnrollments(enrolledCourseIds));

        // 如果只想显示已注册的课程，可以使用以下过滤
        // fetchedCourses = allCourses.filter(course => enrolledCourseIds.includes(course._id));
      }

      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
