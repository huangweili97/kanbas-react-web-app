import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const ENROLLMENTS_API = `${SERVER_URL}/api/enrollments`;

// Get all enrollments for a specific user
export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${userId}`);
  return response.data;
};

// Enroll a user in a course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENTS_API, { userId, courseId });
  return response.data;
};

// Unenroll a user from a course
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await axios.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
};
