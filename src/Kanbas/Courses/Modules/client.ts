import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: any) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return response.data;
 };
 
export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};


export const addLesson = async (moduleId: any, lesson: any) => {
  if (!moduleId || !lesson) {
    throw new Error('Module ID and lesson data are required');
  }
  
  const response = await axiosWithCredentials.post(
    `${MODULES_API}/${moduleId}/lessons`,
    lesson
  );
  return response.data;
};


