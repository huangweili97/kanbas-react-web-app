import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer"
import enrollmentReducer from "./Enrollment/reducer";
import quizzesReducer from "./Courses/Quizs/QuizReducer"
import attemptReducer from "./Courses/Quizs/AttemptReducer"
import detailsReducer from "./Courses/Quizs/DetailsReducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizzesReducer,
    attemptReducer,
    detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;


