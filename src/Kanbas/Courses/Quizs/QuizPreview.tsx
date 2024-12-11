import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedQuiz } from "./QuizReducer";
import * as quizClient from "./client";
import { FaExclamationTriangle, FaQuestionCircle, FaPen } from "react-icons/fa";

const QuizPreview = () => {
  const { cid } = useParams<{ cid: any }>();
  const { quizId } = useParams<{ quizId: any }>(); // Retrieve quizId from URL
  const [userAnswers, setUserAnswers] = useState<Record<any, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<
    Record<number, boolean>
  >({});
  const dispatch = useDispatch();
  const selectedQuiz = useSelector(
    (state: any) => state.quizzesReducer.selectedQuiz
  );
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [loading, setLoading] = useState(true);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null); // Quiz saved time

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const quiz = await quizClient.getQuizById(quizId!);
        dispatch(setSelectedQuiz(quiz));
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, dispatch]);

  const handleSubmitQuiz = async () => {
    try {
      if (!selectedQuiz) return;
      setLoading(true);
      await quizClient.updateQuizAndCascadeDetails(quizId!, selectedQuiz);
      setLastSavedTime(new Date().toLocaleTimeString()); // Update saved time
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading Quiz...</p>;
  }

  if (!selectedQuiz) {
    return <p>No quiz found.</p>;
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const sanitizeHtml = (html: string) => {
    return html.replace(/^<p>|<\/p>$/g, ""); // 移除最外层的 <p> 标签
  };

  const handleDeleteQuestion = async () => {
    if (!selectedQuiz || !Array.isArray(selectedQuiz.questions)) return;

    const updatedQuestions = selectedQuiz.questions.filter(
      (_: any, index: any) => index !== currentQuestionIndex
    );

    const updatedQuiz = {
      ...selectedQuiz,
      questions: updatedQuestions,
    };

    try {
      // 更新后端
      await quizClient.updateQuizAndCascadeDetails(quizId!, updatedQuiz);

      // 更新 Redux 状态
      dispatch(setSelectedQuiz(updatedQuiz));

      // 调整 currentQuestionIndex
      const newIndex = Math.max(
        Math.min(currentQuestionIndex, updatedQuestions.length - 1),
        0
      );
      setCurrentQuestionIndex(newIndex);

      if (updatedQuestions.length === 0) {
        alert("All questions have been deleted.");
      } else {
        alert("Question deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAddMoreQuestions = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionsEditor`, {
      state: { question: null }, // 传递 `null` 表示创建新问题
    });
  };

  const handleCheckAnswer = (index: number) => {
    setCheckedQuestions((prev) => ({ ...prev, [index]: true }));
  };

  const handleAnswerChange = (index: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  // const renderQuestionContent = () => {
  //   if (!currentQuestion) return null;

  //   switch (currentQuestion.type) {
  //     case "multiple_choice":
  //       return (
  //         <ul className="list-unstyled">
  //           {currentQuestion.choices.map((choice: string, index: number) => (
  //             <li key={index} className="border-bottom py-2">
  //               <input
  //                 type="radio"
  //                 id={`choice-${index}`}
  //                 name="answer"
  //                 value={choice}
  //                 disabled
  //               />
  //               <label htmlFor={`choice-${index}`} className="ms-2">
  //                 {choice}
  //               </label>
  //             </li>
  //           ))}
  //         </ul>
  //       );
  //     case "true_false":
  //       return (
  //         <div className="d-flex flex-column">
  //           <label className="mb-2">
  //             <input type="radio" name="answer" value="true" disabled /> True
  //           </label>
  //           <label>
  //             <input type="radio" name="answer" value="false" disabled /> False
  //           </label>
  //         </div>
  //       );
  //     case "fill_in_the_blank":
  //       return (
  //         <div>
  //           <input
  //             type="text"
  //             className="form-control"
  //             placeholder="Type your answer here"
  //             disabled
  //           />
  //         </div>
  //       );
  //     default:
  //       return <p>Unknown question type</p>;
  //   }
  // };
  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    console.log("Current Question:", currentQuestion); // 调试：查看当前问题的数据结构
    console.log("Correct Answers (Array):", currentQuestion.correctAnswers); // 调试：检查 correctAnswers 是否为数组

    switch (currentQuestion.type) {
      case "multiple_choice":
        if (!Array.isArray(currentQuestion.choices)) {
          console.warn(
            "Choices are undefined or not an array:",
            currentQuestion.choices
          );
          return <p>No choices available for this question.</p>;
        }
        return (
          <ul className="list-unstyled">
            {currentQuestion.choices.map((choice: any, index: number) => (
              <li key={index} className="border-bottom py-2">
                <input
                  type="radio"
                  id={`choice-${index}`}
                  name={`answer-${currentQuestionIndex}`}
                  value={choice}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestionIndex, e.target.value)
                  }
                  disabled={checkedQuestions[currentQuestionIndex]}
                />
                <label htmlFor={`choice-${index}`} className="ms-2">
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
                name={`answer-${currentQuestionIndex}`}
                value="true"
                onChange={(e) =>
                  handleAnswerChange(currentQuestionIndex, e.target.value)
                }
                disabled={checkedQuestions[currentQuestionIndex]}
              />{" "}
              True
            </label>
            <label>
              <input
                type="radio"
                name={`answer-${currentQuestionIndex}`}
                value="false"
                onChange={(e) =>
                  handleAnswerChange(currentQuestionIndex, e.target.value)
                }
                disabled={checkedQuestions[currentQuestionIndex]}
              />{" "}
              False
            </label>
          </div>
        );
      case "fill_in_the_blank":
        return (
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Type your answer here"
              value={userAnswers[currentQuestionIndex] || ""}
              onChange={(e) =>
                handleAnswerChange(currentQuestionIndex, e.target.value)
              }
              disabled={checkedQuestions[currentQuestionIndex]}
            />
          </div>
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  return (
    <div className="quiz-preview container mt-4">
      {/* Preview Banner */}
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
        <span>This is a preview of the published version of the quiz.</span>
      </div>
      <h2 className="text-danger">{selectedQuiz.title}</h2>

      <p className="text-muted">
        <strong>Started:</strong> {new Date().toLocaleString()}
      </p>
      <hr />
      {/* Current Question */}
      <div className="current-question card mb-4">
        {/* Check Button Section */}
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleCheckAnswer(currentQuestionIndex)}
            disabled={checkedQuestions[currentQuestionIndex]}
          >
            Check
          </button>
        </div>
        <div className="card-header d-flex justify-content-between">
          <span>
            <strong>Question {currentQuestionIndex + 1}:</strong>{" "}
            {sanitizeHtml(currentQuestion.title)}
          </span>
          <span>{currentQuestion.points} pts</span>
        </div>
        {/* <div className="card-body">{renderQuestionContent()}</div> */}
        <div className="card-body">{renderQuestionContent()}</div>

        {checkedQuestions[currentQuestionIndex] && (
          <div className="card-footer">
            <p>
              <strong>Correct Answer:</strong>{" "}
              {Array.isArray(currentQuestion.correctAnswer) ? (
                <>
                  <p>Correct Answer(s):</p>
                  <ul>
                    {currentQuestion.correctAnswer.map(
                      (answer: string, index: number) => (
                        <li key={index}>{answer}</li>
                      )
                    )}
                  </ul>
                </>
              ) : typeof currentQuestion.correctAnswer === "boolean" ? (
                currentQuestion.correctAnswer ? (
                  "True"
                ) : (
                  "False"
                )
              ) : typeof currentQuestion.correctAnswer === "string" ? (
                currentQuestion.correctAnswer
              ) : (
                "No correct answer provided"
              )}
            </p>
            <p>
              <strong>Your Answer:</strong>{" "}
              {userAnswers[currentQuestionIndex] !== undefined
                ? userAnswers[currentQuestionIndex]
                : "No answer"}
            </p>
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mb-4">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentQuestionIndex === selectedQuiz.questions.length - 1}
        >
          Next
        </button>
      </div>

      {/* Quiz Save and Submit Section */}
      <div
        className="d-flex justify-content-between align-items-center mt-4 p-3 border rounded"
        style={{
          backgroundColor: "#f8f9fa", // 浅灰背景
          borderColor: "#dee2e6", // 边框颜色
          marginTop: "20px", // 上边距
          marginBottom: "20px", // 下边距
        }}
      >
        <span className="text-muted" style={{ fontSize: "14px" }}>
          Quiz saved at {lastSavedTime || "Not saved yet"}
        </span>
        <button
          className="btn btn-outline-secondary"
          onClick={handleSubmitQuiz}
          disabled={loading}
          style={{
            padding: "8px 16px", // 按钮内边距
            fontSize: "14px", // 字体大小
          }}
        >
          {loading ? "Saving..." : "Submit Quiz"}
        </button>
      </div>

      {/* Keep Editing This Question */}
      <div
        className="border rounded p-3 d-flex align-items-center mb-4"
        style={{
          borderColor: "#dee2e6",
          backgroundColor: "#f8f9fa",
        }}
      >
        <FaPen className="me-2 text-secondary" style={{ fontSize: "18px" }} />
        <button
          className="btn btn-link text-secondary p-0 text-decoration-none"
          onClick={() => {
            switch (currentQuestion.type) {
              case "multiple_choice":
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/multiple`, {
                  state: { question: currentQuestion },
                });
                break;
              case "true_false":
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/torf`, {
                  state: { question: currentQuestion },
                });
                break;
              case "fill_in_the_blank":
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/fill`, {
                  state: { question: currentQuestion },
                });
                break;
              default:
                console.error("Unsupported question type");
            }
          }}
          style={{ cursor: "pointer", fontSize: "16px" }}
        >
          Keep Editing This Question
        </button>
      </div>

      {/* Question List */}
      <div className="question-list mt-4">
        <h5 className="text-muted">Questions</h5>
        <ul className="list-group">
          {selectedQuiz.questions.map((_: any, index: number) => (
            <li
              key={index}
              className={`list-group-item d-flex align-items-center ${
                currentQuestionIndex === index
                  ? "text-danger bg-white border-danger"
                  : ""
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
              style={{
                cursor: "pointer",
              }}
            >
              <FaQuestionCircle
                className={`me-2 ${
                  currentQuestionIndex === index ? "text-danger" : "text-dark"
                }`}
              />
              Question {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {/* Add More Questions and Delete Current Question Buttons */}
      <div className="mt-4 d-flex justify-content-start">
        <div className="btn-group">
          <button
            className="btn btn-danger"
            style={{ marginRight: "10px" }}
            onClick={handleAddMoreQuestions}
          >
            + Add More Questions
          </button>
          <button className="btn btn-primary" onClick={handleDeleteQuestion}>
            Delete Current Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
