import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface EnrollmentState {
  enrollments: string[]; // Array of enrolled course IDs
}

// Define the initial state
const initialState: EnrollmentState = {
  enrollments: [], // Start with an empty array
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Add a course to the enrollments list
    enroll: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      if (courseId && !state.enrollments.includes(courseId)) {
        state.enrollments.push(courseId);
      }
    },

    // Remove a course from the enrollments list
    unenroll: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      if (courseId) {
        state.enrollments = state.enrollments.filter((id) => id !== courseId);
      }
    },

    // Set the enrollments list from external data (e.g., persisted data)
    setEnrollments: (state, action: PayloadAction<string[]>) => {
      const newEnrollments = action.payload;
      if (Array.isArray(newEnrollments)) {
        state.enrollments = newEnrollments;
      } else {
        console.error("Invalid enrollments data provided.");
      }
    },
  },
});

// Export actions and reducer
export const { enroll, unenroll, setEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;



// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define initial state for enrollments as an empty array
// const initialState = {
//   enrollments: [] // Array to hold course IDs the student is enrolled in
// };

// const enrollmentSlice = createSlice({
//   name: 'enrollments',
//   initialState,
//   reducers: {
//     enroll: (state:any, action: PayloadAction<string>) => {
//       if (!state.enrollments.includes(action.payload)) {
//         state.enrollments.push(action.payload); // Add course ID to enrollments
//       }
//     },
//     unenroll: (state, action: PayloadAction<string>) => {
//       state.enrollments = state.enrollments.filter(id => id !== action.payload); // Remove course ID from enrollments
//     },
//     setEnrollments: (state:any, action: PayloadAction<string[]>) => {
//       state.enrollments = action.payload; // Set enrollments from persisted data
//     }
//   }
// });

// export const { enroll, unenroll, setEnrollments } = enrollmentSlice.actions;
// export default enrollmentSlice.reducer;
