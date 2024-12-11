import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 QuizDetails 类型
export interface QuizDetails {
  quizType?: string;
  points?: number;
  title?:string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  howManyAttempts?: number;
  showCorrectAnswers?: boolean;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  assignTo?:string;
  instruction?:string;
}

// 定义初始状态
interface DetailsState {
  details: QuizDetails | null;
}

const initialState: DetailsState = {
  details: null,
};

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
      setQuizDetails: (state, action: PayloadAction<QuizDetails>) => {
        //console.log("set state with details:", action.payload); // 确认接收到的 payload
        state.details = action.payload;
      },
      updateQuizDetails: (state, action: PayloadAction<Partial<QuizDetails>>) => {
        console.log("Updating quiz details with:", action.payload); // 打印更新的部分
        console.log("Previous state:", state.details); // 打印更新前的状态
        state.details = { ...state.details, ...action.payload };
        console.log("Updated state:", state.details); // 打印更新后的状态
      },
    },
  });
  

export const { setQuizDetails, updateQuizDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
