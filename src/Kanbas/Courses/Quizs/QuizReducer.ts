import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 Question 类型
interface Question {
  questionNumber: string;
  type: string;
  title: string;
  points: number;
  choices?: string[];
  correctAnswer?: string | boolean | string[]; // 支持多种答案格式
}

// 定义 Quiz 类型
interface Quiz {
  _id: string;
  quizNumber: string;
  module: string;
  course: string;
  title: string;
  totalPoints: number;
  questions: Question[];
  availableDate: string;
  availableUntil: string;
  dueDate: string;
  isPublished?: boolean; // 是否发布
  quizth?:number;
}

// 定义初始状态
interface QuizState {
  quizzes: Quiz[];
  selectedQuiz: Quiz | null;
}

const initialState: QuizState = {
  quizzes: [],
  selectedQuiz: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      //console.log("Updating state with quizzes:", action.payload); // 确认接收到的 payload
      state.quizzes = action.payload;
    },    
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz
      );
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz._id !== action.payload);
    },
    setSelectedQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.selectedQuiz = action.payload;
    },
    toggleQuizPublish: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload ? { ...quiz, isPublished: !quiz.isPublished } : quiz
      );
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setSelectedQuiz,
  toggleQuizPublish,
} = quizSlice.actions;

export default quizSlice.reducer;
