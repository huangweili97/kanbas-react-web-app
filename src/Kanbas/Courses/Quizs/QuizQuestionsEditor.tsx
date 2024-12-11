import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuiz } from "./QuizReducer";

const QuizQuestionsEditor = () => {
  const { cid } = useParams<{ cid: string }>();
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedQuiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );
  


  // Ensure the selected quiz is loaded in the Redux state
  useEffect(() => {
    if (selectedQuiz) {
      dispatch(setSelectedQuiz(selectedQuiz));
    }
  }, [selectedQuiz, dispatch]);

  const questions = selectedQuiz?.questions || [];

  return (
    <div className="quiz-questions-editor container mt-4">

      <div className="text-center mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/questionsEditor`)}
        >
          + New Question
        </button>
      </div>

      {/* Save and Cancel Buttons in the Center */}
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-outline-secondary"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => console.log("Save")}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizQuestionsEditor;
