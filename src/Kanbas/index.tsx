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


import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector, useDispatch } from "react-redux";
import { Course, User } from "./types"; // 导入共享类型


export default function Kanbas() {
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const [courses, setCourses] = useState<any[]>([]);
 const [enrolling, setEnrolling] = useState<boolean>(false);

  // const [courses, setCourses] = useState<Course[]>([]);
  // const currentUser = useSelector(
  //   (state: RootState) => state.accountReducer.currentUser
  // ) as User | null;
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const findCoursesForUser = async () => {
    try {
      let courses = await userClient.findCoursesForUser(currentUser._id);
      // 过滤掉 null 项
      courses = courses.filter((course: any) => course !== null);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
 
  const addNewCourse = async () => {
    // const newCourse = await userClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
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
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      let enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );

      // 过滤掉 null 项
      enrolledCourses = enrolledCourses.filter((course: any) => course !== null);

      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
       // 过滤掉无效的课程数据
      const validCourses = allCourses.filter((course:any) => course !== null);
      setCourses(allCourses); // 设置为所有课程
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };
 

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "FACULTY") {
        fetchAllCourses(); // 如果是FACULTY，加载所有课程
      } else if (currentUser.role === "STUDENT") {
        if (enrolling) {
          fetchCourses(); // 如果是STUDENT且切换到显示所有课程
        } else {
          findCoursesForUser(); // 如果是STUDENT显示已选课程
        }
      }
    }
  }, [currentUser, enrolling]);
 

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
                  <Dashboard courses={courses} course={course} setCourse={setCourse}
              addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse}
              enrolling={enrolling} setEnrolling={setEnrolling} updateEnrollment={updateEnrollment}/>

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
