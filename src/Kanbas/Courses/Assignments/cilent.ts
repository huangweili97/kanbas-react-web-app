import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// 获取某课程的作业（通过 course.number）
export const fetchAssignmentsForCourse = async (courseNumber: string) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseNumber}/assignments`
  );
  return response.data;
};

// 创建作业
export const createAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

// 更新作业
export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};

// 删除作业
export const deleteAssignment = async (assignmentId: string) => {
  await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

// 根据作业 ID 获取作业
export const fetchAssignmentById = async (assignmentId: string) => {
  const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};



// // client.ts
// import axios from "axios";

// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// export const fetchAssignmentsForCourse = async (courseId: string) => {
//   const response = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
//   return response.data;
// };

// export const createAssignment = async (assignment: any) => {
//   const response = await axios.post(ASSIGNMENTS_API, assignment);
//   return response.data;
// };

// export const updateAssignment = async (assignment: any) => {
//   const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
//   return response.data;
// };

// export const deleteAssignment = async (assignmentId: string) => {
//   await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
// };

// export const fetchAssignmentById = async (assignmentId: string) => {
//   const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
//   return response.data;
// };
