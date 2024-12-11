import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAttempts, addAttempt } from "./AttemptReducer";
import * as quizClient from "./client";
import { RootState } from "../../store";
import { User } from "../../types";
import { FaExclamationTriangle } from "react-icons/fa";

const StudentQuizPage = () => {
  const { cid } = useParams<{ cid: any }>();
  const { quizId } = useParams<{ quizId: any }>();
  const dispatch = useDispatch();

  const attempts = useSelector(
    (state: any) => state.attemptReducer.attempts || []
  );

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  const [quiz, setQuiz] = useState<any>(null);
  const [quizDetail, setQuizDetail] = useState<any>(null); // 新增状态

  const [answers, setAnswers] = useState<any>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [attemptsExceeded, setAttemptsExceeded] = useState<boolean>(false); // 新增状态

  const determineAvailability = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntil = new Date(quiz.availableUntil);

    if (currentDate > availableUntil) {
      return "Closed";
    } else if (currentDate >= availableDate && currentDate <= availableUntil) {
      return "Available";
    } else if (currentDate < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizData = await quizClient.getQuizById(quizId!);
        setQuiz(quizData);
        console.log("quiz fetch is", quizData);

        // 检查状态
        const availability = determineAvailability(quizData);
        if (availability === "Closed") {
          setMessage("This quiz is closed and cannot be attempted.");
          setLoading(false);
          return; // 不再加载其他数据
        } else if (availability === "Not available") {
          setLoading(false);
          return; // 不再加载其他数据
        } else if (availability === "Closed") {
          setLoading(false);
          return; // 不再加载其他数据
        }

        const detailData = await quizClient.getQuizDetailsByQuizId(quizId!);
        setQuizDetail(detailData);

        const studentAttemptDoc = await quizClient.getStudentAttempts(
          quizData.quizNumber,
          currentUser?._id
        );
        console.log("Fetched student attempt document:", studentAttemptDoc);

        // 如果返回的是整个 Attempt 文档，提取其中的 attempts 数组
        const attemptsData = studentAttemptDoc?.attempts || [];
        console.log("Extracted attempts:", attemptsData);
        dispatch(setAttempts(attemptsData));

        // 检查尝试次数是否超出
        if (
          detailData.howManyAttempts &&
          attemptsData.length >= detailData.howManyAttempts
        ) {
          setAttemptsExceeded(true);
          setMessage(
            "You have exceeded the maximum number of attempts. You cannot attempt this quiz again."
          );
        }
      } catch (err) {
        console.error("Failed to load quiz or attempts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, dispatch]);

  const sanitizeHtml = (html: string) => html.replace(/^<p>|<\/p>$/g, ""); // Remove outer <p> tags


  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      setMessage("User not logged in. Please log in to submit the quiz.");
      return;
    }

    // 再次检查尝试次数
    if (
      quizDetail?.howManyAttempts &&
      Array.isArray(attempts) && // 确保 attempts 是数组
      attempts.length >= quizDetail.howManyAttempts
    ) {
      // setMessage(
      //   "You have exceeded the maximum number of attempts. You cannot attempt this quiz again."
      // );
      return;
    }

    const formattedAnswers = Object.keys(answers).map((key) => ({
      questionIndex: Number(key),
      selectedAnswer: answers[key],
    }));

    try {
      setLoading(true);
      const result = await quizClient.submitStudentAttempt(
        cid,
        quiz.quizNumber!,
        currentUser._id,
        formattedAnswers
      );
      console.log("result delivered to backend is", result);
      dispatch(addAttempt(result));
      //setMessage("Quiz submitted successfully!");
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      //setMessage("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  const latestAttempt = attempts?.[attempts.length - 1] || null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const renderQuestionContent = (q: any, index: number) => {
    switch (q.type) {
      case "multiple_choice":
        return (
          <ul className="list-unstyled">
            {q.choices.map((choice: string, choiceIndex: number) => (
              <li key={choiceIndex} className="border-bottom py-2">
                <input
                  type="radio"
                  id={`choice-${index}-${choiceIndex}`}
                  name={`question-${index}`}
                  value={choice}
                  onChange={() => handleAnswerChange(index, choice)}
                />
                <label
                  htmlFor={`choice-${index}-${choiceIndex}`}
                  className="ms-2"
                >
                  {choice}
                </label>
              </li>
            ))}
          </ul>
        );
      case "true_false":
        return (
          <div className="d-flex flex-column">
            <label className="mb-2">
              <input
                type="radio"
                name={`question-${index}`}
                value="true"
                onChange={() => handleAnswerChange(index, "true")}
              />{" "}
              True
            </label>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="false"
                onChange={() => handleAnswerChange(index, "false")}
              />{" "}
              False
            </label>
          </div>
        );
      case "fill_in_the_blank":
        return (
          <input
            type="text"
            className="form-control"
            placeholder="Type your answer here"
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <div className="quiz-container container mt-4">
      {/* 如果有超出尝试次数的提示消息 */}
      {attemptsExceeded && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
          style={{
            border: "1px solid #dc3545",
            backgroundColor: "#f8d7da",
            color: "#842029",
            borderRadius: "5px",
            padding: "10px 15px",
            marginBottom: "20px",
          }}
        >
          <FaExclamationTriangle
            style={{
              fontSize: "20px",
              marginRight: "10px",
            }}
          />
          <span>{message}</span>
        </div>
      )}
      <h2 className="mb-4">{quiz.title}</h2>
      {latestAttempt && (
        <div className="mb-4">
          <h4>Last Attempt</h4>
          <ul>
            {latestAttempt?.answers?.map((ans: any, index: number) => (
              <li key={index}>
                <strong>Question {index + 1}</strong>: {ans.selectedAnswer}{" "}
                {ans.isCorrect ? (
                  <span style={{ color: "green" }}>✔</span>
                ) : (
                  <span style={{ color: "red" }}>✘</span>
                )}
              </li>
            ))}
          </ul>
          <p>Score: {latestAttempt?.score || 0}</p>
        </div>
      )}
      <div className="card mb-4">
        <div className="card-header">
          <p>
            <strong>
              Question {currentQuestionIndex + 1}/{quiz.questions.length}
            </strong>{" "}
            - {sanitizeHtml(currentQuestion.title)} ({currentQuestion.points} pts)
          </p>
        </div>
        <div className="card-body">
          {renderQuestionContent(currentQuestion, currentQuestionIndex)}
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === quiz.questions.length - 1}
        >
          Next
        </button>
      </div>
      <div className="d-flex justify-content-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading || attemptsExceeded} // 禁用提交按钮
          className="btn btn-primary"
          style={{ backgroundColor: "red", borderColor: "red" }}
        >
          Submit Quiz
        </button>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default StudentQuizPage;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { setAttempts, addAttempt } from "./AttemptReducer";
// import * as quizClient from "./client";
// import { RootState } from "../../store";
// import { User } from "../../types";

// const StudentQuizPage = () => {
//   const { quizId } = useParams<{ quizId: any }>();
//   const dispatch = useDispatch();

//   const attempts = useSelector((state: any) => state.attemptReducer.attempts);
//   const currentUser = useSelector(
//     (state: RootState) => state.accountReducer?.currentUser
//   ) as User | null;

//   const [quiz, setQuiz] = useState<any>(null);
//   const [answers, setAnswers] = useState<any>({});
//   const [message, setMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const quizData = await quizClient.getQuizById(quizId!);
//         setQuiz(quizData);

//         const studentAttempts = await quizClient.getStudentAttempts(
//           quizData.quizNumber,
//           currentUser?._id
//         );
//         console.log(studentAttempts);
//         dispatch(setAttempts(studentAttempts));
//       } catch (err) {
//         console.error("Failed to load quiz or attempts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizData();
//   }, [quizId, dispatch]);

//   const handleAnswerChange = (questionIndex: number, answer: any) => {
//     setAnswers({ ...answers, [questionIndex]: answer });
//   };

//   const handleSubmit = async () => {
//     if (!currentUser) {
//       setMessage("User not logged in. Please log in to submit the quiz.");
//       return;
//     }

//     // 检查是否超过最大尝试次数
//   if (quiz?.howManyAttempts && attempts.length >= quiz.howManyAttempts) {
//     setMessage("You have exceeded the maximum number of attempts. You cannot attempt this quiz again.");
//     return;
//   }

//     const formattedAnswers = Object.keys(answers).map((key) => ({
//       questionIndex: Number(key),
//       selectedAnswer: answers[key],
//     }));

//     try {
//       setLoading(true);
//       const result = await quizClient.submitStudentAttempt(
//         quiz.quizNumber!,
//         currentUser._id,
//         formattedAnswers // Send formatted answers
//       );
//       console.log("result delieverd to back end is", result);
//       dispatch(addAttempt(result));
//       //setMessage("Quiz submitted successfully!");
//     } catch (err) {
//       console.error("Failed to submit quiz:", err);
//       //setMessage("Failed to submit quiz. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < quiz.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   if (loading) {
//     return <div>Loading quiz...</div>;
//   }

//   const latestAttempt = attempts?.[attempts.length - 1] || null;

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   const renderQuestionContent = (q: any, index: number) => {
//     switch (q.type) {
//       case "multiple_choice":
//         return (
//           <ul className="list-unstyled">
//             {q.choices.map((choice: string, choiceIndex: number) => (
//               <li key={choiceIndex} className="border-bottom py-2">
//                 <input
//                   type="radio"
//                   id={`choice-${index}-${choiceIndex}`}
//                   name={`question-${index}`}
//                   value={choice}
//                   onChange={() => handleAnswerChange(index, choice)}
//                 />
//                 <label
//                   htmlFor={`choice-${index}-${choiceIndex}`}
//                   className="ms-2"
//                 >
//                   {choice}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         );
//       case "true_false":
//         return (
//           <div className="d-flex flex-column">
//             <label className="mb-2">
//               <input
//                 type="radio"
//                 name={`question-${index}`}
//                 value="true"
//                 onChange={() => handleAnswerChange(index, "true")}
//               />{" "}
//               True
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`question-${index}`}
//                 value="false"
//                 onChange={() => handleAnswerChange(index, "false")}
//               />{" "}
//               False
//             </label>
//           </div>
//         );
//       case "fill_in_the_blank":
//         return (
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Type your answer here"
//             onChange={(e) => handleAnswerChange(index, e.target.value)}
//           />
//         );
//       default:
//         return <p>Unknown question type</p>;
//     }
//   };

//   return (
//     <div className="quiz-container container mt-4">
//       <h2 className="mb-4">{quiz.title}</h2>
//       {latestAttempt && (
//         <div className="mb-4">
//           <h4>Last Attempt</h4>
//           <ul>
//             {latestAttempt?.answers?.map((ans: any, index: number) => (
//               <li key={index}>
//                 <strong>Question {index + 1}</strong>: {ans.selectedAnswer}{" "}
//                 {ans.isCorrect ? (
//                   <span style={{ color: "green" }}>✔</span>
//                 ) : (
//                   <span style={{ color: "red" }}>✘</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <p>Score: {latestAttempt?.score || 0}</p>

//         </div>
//       )}
//       <div className="card mb-4">
//         <div className="card-header">
//           <p>
//             <strong>
//               Question {currentQuestionIndex + 1}/{quiz.questions.length}
//             </strong>{" "}
//             - {currentQuestion.title} ({currentQuestion.points} pts)
//           </p>
//         </div>
//         <div className="card-body">
//           {renderQuestionContent(currentQuestion, currentQuestionIndex)}
//         </div>
//       </div>
//       <div className="d-flex justify-content-between">
//         <button
//           className="btn btn-secondary"
//           onClick={handlePreviousQuestion}
//           disabled={currentQuestionIndex === 0}
//         >
//           Previous
//         </button>
//         <button
//           className="btn btn-secondary"
//           onClick={handleNextQuestion}
//           disabled={currentQuestionIndex === quiz.questions.length - 1}
//         >
//           Next
//         </button>
//       </div>
//       <div className="d-flex justify-content-end mt-4">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="btn btn-primary"
//           style={{ backgroundColor: "red", borderColor: "red" }}
//         >
//           Submit Quiz
//         </button>
//         {message && <p className="mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default StudentQuizPage;
