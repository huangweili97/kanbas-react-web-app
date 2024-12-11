import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuizDetails } from "./DetailsReducer";
import * as quizClient from "./client";
import "bootstrap/dist/css/bootstrap.min.css";

const QuizDetails = () => {
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const quizDetails = useSelector((state: any) => state.detailsReducer.details);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        if (quizId) {
          const data = await quizClient.getQuizDetailsByQuizId(quizId);
          dispatch(setQuizDetails(data));
        }
      } catch (error) {
        console.error("Failed to fetch quiz details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizDetails();
  }, [quizId, dispatch]);

  const formatDate = (date: string | undefined) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  if (loading) return <div>Loading quiz details...</div>;
  if (!quizDetails) return <div>No quiz details found.</div>;

  return (
    <div
      className="quiz-details container mt-4"
      style={{ maxWidth: "70%", marginLeft: "auto", marginRight: "auto" }} // 向右偏移
    >
      {/* 标题 */}
      <h2 className="text-center mb-3">{quizDetails.title || "Quiz Title"}</h2>

      {/* 按钮 */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/preview`)
          }}
        >
          Preview
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            const path = `/Kanbas/Courses/${cid}/Quizzes/${quizId}/editor`;
            //console.log("Navigating to:", path); // Debug: Log the path
            navigate(path);
          }}
        >
          Edit
        </button>
      </div>

      <hr />

      {/* Quiz 详情 */}
      <div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Quiz Type:</div>
          <div className="col-8">{quizDetails.quizType || "Graded Quiz"}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Points:</div>
          <div className="col-8">{quizDetails.points || 0}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Assignment Group:</div>
          <div className="col-8">
            {quizDetails.assignmentGroup || "Quizzes"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Shuffle Answers:</div>
          <div className="col-8">
            {quizDetails.shuffleAnswers ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Time Limit:</div>
          <div className="col-8">
            {quizDetails.timeLimit || "No limit"} minutes
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Multiple Attempts:</div>
          <div className="col-8">
            {quizDetails.multipleAttempts ? "Yes" : "No"}
          </div>
        </div>
        {quizDetails.multipleAttempts && (
          <div className="row mb-2">
            <div className="col-4 text-end fw-bold">How Many Attempts:</div>
            <div className="col-8">{quizDetails.howManyAttempts || 1}</div>
          </div>
        )}
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">View Responses:</div>
          <div className="col-8">Always</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Show Correct Answers:</div>
          <div className="col-8">
            {quizDetails.showCorrectAnswers ? "Immediately" : "Later"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Access Code:</div>
          <div className="col-8">{quizDetails.accessCode || "None"}</div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">One Question at a Time:</div>
          <div className="col-8">
            {quizDetails.oneQuestionAtATime ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">Webcam Required:</div>
          <div className="col-8">
            {quizDetails.webcamRequired ? "Yes" : "No"}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-4 text-end fw-bold">
            Lock Questions After Answering:
          </div>
          <div className="col-8">
            {quizDetails.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>
      </div>

      <hr />

      {/* 日期表格 */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quizDetails.dueDate)}</td>
            <td>{quizDetails.assignTo}</td>
            <td>{formatDate(quizDetails.availableDate)}</td>
            <td>{formatDate(quizDetails.untilDate)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuizDetails;
