// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: null, // To store current user information
//   enrollments: {}, // To track enrollments for each user, e.g., { userId: [courseId1, courseId2] }
// };

// const accountSlice = createSlice({
//   name: "account",
//   initialState,
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     enrollInCourse: (state: any, action) => {
//       const { userId, courseId } = action.payload;
//       if (!state.enrollments[userId]) {
//         state.enrollments[userId] = [];
//       }
//       if (!state.enrollments[userId].includes(courseId)) {
//         state.enrollments[userId].push(courseId);
//       }
//     },
//     unenrollFromCourse: (state:any, action) => {
//       const { userId, courseId } = action.payload;
//       if (state.enrollments[userId]) {
//         state.enrollments[userId] = state.enrollments[userId].filter((id:any) => id !== courseId);
//       }
//     },
//   },
// });


// export const { setCurrentUser, enrollInCourse, unenrollFromCourse } = accountSlice.actions;
// export default accountSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // To store current user information
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null; // Clear currentUser to log out the user
    },

    
  },
});

export const { setCurrentUser, signOut } = accountSlice.actions;
export default accountSlice.reducer;

