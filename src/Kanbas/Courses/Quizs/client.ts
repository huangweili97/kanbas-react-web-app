import axios from "axios";
import { error } from "console";

// Base configuration for Axios
const axiosWithCredentials = axios.create({
  withCredentials: true,
});



const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/quizzes/attempts`;
const DETAILS_API = `${REMOTE_SERVER}/api/quizzes/details`;


// 获得该课程全部的quiz，quiz首页呈现的内容
export const getQuizzesByCourseId = async (courseId: any) => {
  
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`
  );
  return response.data;
};

//获得特定quiz的detail
export const getQuizDetailsByQuizId = async (quizId: any) => {
    // 根据 quizId 获取对应的 quiz
    const quizResponse = await axiosWithCredentials.get(`${DETAILS_API}/${quizId}`);
    const details = quizResponse.data;
    //console.log("detail API response:", details); // 验证接口返回的内容

    if (!details) {
      throw new Error("Quiz not found or quizNumber missing");
    }

   return details;
};

// 更新某个特定quiz的detail
export const updateQuizDetails = async (detailId: any, detailsData: object) => {
  try {
    const response = await axiosWithCredentials.put(
      `${DETAILS_API}/${detailId}`, // 使用 detailId 替代 quizNumber
      detailsData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update quiz details:", error);
    throw error;
  }
};

// 根据quizId找到某个quiz
export const getQuizById = async (quizId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuizAndCascadeDetails = async (
  quizId: any,
  quizData: object
) => {
  try {
    const response = await axiosWithCredentials.put(
      `${QUIZZES_API}/${quizId}`,
      { quizData }
    );
    console.log(`Quiz and Quiz Detail updated successfully`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      `Failed to update quiz and cascade details for quizId ${quizId}:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data || "An error occurred while updating quiz and cascading details"
    );
  }
};

export const createQuizWithDetails = async (courseId: any, quizData: any, detailData: any) => {
  try {
    // 创建 Quiz
    const createdQuizResponse = await axiosWithCredentials.post(
      `${QUIZZES_API}/course/${courseId}`,
      quizData
    );
    const createdQuiz = createdQuizResponse.data;

    // 检查是否生成了 _id
    if (!createdQuiz._id) {
      throw new Error("Quiz creation failed: _id not generated.");
    }

    // 创建 Quiz Details
    const createdDetailsResponse = await axiosWithCredentials.post(
      `${DETAILS_API}`,
      { ...detailData, quizNumber: createdQuiz.quizNumber }
    );
    const createdDetails = createdDetailsResponse.data;

    return { createdQuiz, createdDetails };
  } catch (error) {
    console.error("Failed to create quiz and details:", error);
    throw error;
  }
};

// 删除 Quiz
export const deleteQuiz = async (quizId:any) => {
  try {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    throw error;
    
  }
};

// 发布或取消发布 Quiz
export const publishQuiz = async (quizId:any, isPublished:boolean) => {
  try {
    const response = await axiosWithCredentials.put(
      `${QUIZZES_API}/${quizId}/publish`,
      { isPublished }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to publish/unpublish quiz:", error);
    throw error;
  }
};

// 复制 Quiz
export const copyQuiz = async (quizId:any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${QUIZZES_API}/${quizId}/copy`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to copy quiz:", error);
    throw error;
  }
};

export const getStudentAttempts = async (quizNumber:any, studentId:any) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${quizNumber}?studentId=${studentId}`
  );
  return response.data;
};


// export const submitStudentAttempt = async (quizId: any, answers: any) => {
//   const response = await axios.post(`${ATTEMPTS_API}/${quizId}`, { answers });
//   return response.data;
// };
export const submitStudentAttempt = async (
  courseId: any,
  quizNumber: string,
  studentId: any,
  answers: any
) => {
  const response = await axiosWithCredentials.post(
    `${ATTEMPTS_API}/${courseId}/${quizNumber}`,
    { studentId, answers }
  );
  return response.data;
};


// API Methods for Quiz Attempts
export const getAttemptsByQuizNumber = async (quizNumber: string) => {
  const response = await axiosWithCredentials.get(`${ATTEMPTS_API}/${quizNumber}`);
  return response.data;
};

export const createAttempt = async (attemptData: any) => {
  const response = await axiosWithCredentials.post(ATTEMPTS_API, attemptData);
  return response.data;
};

// API Methods for Quiz Details


export const createQuizDetails = async (detailsData: object) => {
  const response = await axiosWithCredentials.post(DETAILS_API, detailsData);
  return response.data;
};


export const getStudentAttemptsForCourse = async (studentId: any, courseId: any) => {
  try {
    const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseId}/students/${studentId}/grades`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student attempts for course:", error);
    throw error;
  }
};


export const getQuizByNumber = async (quizNumber: string) => {
  try {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/quizzes/number/${quizNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch quiz by name ${quizNumber}:`, error);
    throw error;
  }
};





  

