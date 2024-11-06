import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define initial state for enrollments as an empty array
const initialState = {
  enrollments: [] // Array to hold course IDs the student is enrolled in
};

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    enroll: (state:any, action: PayloadAction<string>) => {
      if (!state.enrollments.includes(action.payload)) {
        state.enrollments.push(action.payload); // Add course ID to enrollments
      }
    },
    unenroll: (state, action: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter(id => id !== action.payload); // Remove course ID from enrollments
    },
    setEnrollments: (state:any, action: PayloadAction<string[]>) => {
      state.enrollments = action.payload; // Set enrollments from persisted data
    }
  }
});

export const { enroll, unenroll, setEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
