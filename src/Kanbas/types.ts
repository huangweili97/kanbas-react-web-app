// types.ts

export interface Course {
    _id: any;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    description: string;
    // 其他课程属性...
  }
  
  export interface User {
    _id: any;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: "FACULTY" | "STUDENT" | "TA";
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
  }
  