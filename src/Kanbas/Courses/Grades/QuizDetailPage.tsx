import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as quizClient from "../Quizs/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { User } from "../../types";

const QuizDetailsPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const fetchedQuiz = await quizClient.getQuizById(quizId!);
        const fetchedAttempts = await quizClient.getStudentAttempts(
          fetchedQuiz.quizNumber,
          currentUser?._id
        );

        setQuiz(fetchedQuiz);
        setAttempts(fetchedAttempts?.attempts || []);
      } catch (err: any) {
        setError("Failed to load quiz details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, currentUser]);

  const sanitizeHtml = (html: string) => {
    return html.replace(/^<p>|<\/p>$/g, ""); // 移除最外层的 <p> 标签
  };

  const getAnswerDetails = (questionIndex: number) => {
    const latestAttempt = attempts[attempts.length - 1];
    if (!latestAttempt?.answers?.[questionIndex]) {
      return { selectedAnswer: "Not Answered", isCorrect: false };
    }
    const { selectedAnswer, isCorrect } = latestAttempt.answers[questionIndex];
    return { selectedAnswer: selectedAnswer || "Not Answered", isCorrect };
  };

  const renderQuestionContent = (question: any) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <ul className="list-unstyled">
            {question.choices.map((choice: string, index: number) => (
              <li key={index} className="border-bottom py-2">
                <label>
                  <input
                    type="radio"
                    value={choice}
                    disabled
                    className="me-2"
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
        );
      case "true_false":
        return (
          <div className="d-flex flex-column">
            <label>
              <input type="radio" value="true" disabled className="me-2" />
              True
            </label>
            <label>
              <input type="radio" value="false" disabled className="me-2" />
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
            disabled
          />
        );
      default:
        return <p>Unknown question type</p>;
    }
  };

  const renderCorrectAnswer = (correctAnswer: any) => {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.join(", ");
    }
    if (typeof correctAnswer === "boolean") {
      return correctAnswer ? "True" : "False";
    }
    return correctAnswer || "No correct answer provided";
  };

  if (loading) return <div>Loading quiz details...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!quiz) return <div>No quiz found.</div>;

  return (
    <div className="quiz-details container mt-4">
      <h2 className="text-danger">{quiz.title}</h2>
      <p className="text-muted">Total Points: {quiz.totalPoints}</p>
      <p className="text-muted">
        <strong>Score:</strong> {attempts[attempts.length - 1]?.score || 0} /{" "}
        {quiz.totalPoints}
      </p>
      <p className="text-muted">
        Due Date: {new Date(quiz.dueDate).toLocaleDateString()}
      </p>
      <hr />
      {quiz.questions.map((question: any, index: number) => {
        const { selectedAnswer, isCorrect } = getAnswerDetails(index);
        return (
          <div key={index} className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <span>
                <strong>Question {index + 1}:</strong>{" "}
                {sanitizeHtml(question.title)}
              </span>

              <span>{question.points} pts</span>
            </div>
            <div className="card-body">{renderQuestionContent(question)}</div>
            <div className="card-footer">
              <p>
                <strong>My Answer:</strong>{" "}
                <span className="text-dark">{selectedAnswer}</span>
              </p>
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span className="text-success">
                  {renderCorrectAnswer(question.correctAnswer)}
                </span>
              </p>
              <p className={isCorrect ? "text-success" : "text-danger"}>
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizDetailsPage;
