import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 Attempt 类型
interface Attempt {
  courseId:any;
  studentId: any;
  quizNumber: string;
  attemptNumber: number;
  attemptDate: Date;
  attempts: Array<{
    answers: Array<{
      score: number;
      selectedAnswer: string;
      isCorrect: boolean;
    }>;
  }>;
}

// 定义初始状态
interface AttemptState {
  attempts: Attempt[];
}

const initialState: AttemptState = {
  attempts: [],
};

const attemptSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {
    setAttempts: (state, action: PayloadAction<Attempt[]>) => {
      state.attempts = action.payload;
    },
    addAttempt: (state, action: PayloadAction<Attempt>) => {
      state.attempts.push(action.payload);
    },
  },
});

export const { setAttempts, addAttempt } = attemptSlice.actions;

export default attemptSlice.reducer;
