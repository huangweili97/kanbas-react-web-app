import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"; // 富文本编辑框
import "react-quill/dist/quill.snow.css";
import { updateQuiz } from "./QuizReducer";
import * as quizClient from "./client";

const TrueFalseQuestionEditor: React.FC<{ onCancel?: () => void }> = ({
  onCancel,
}) => {
  const { cid } = useParams<{ cid: any }>();
  const { quizId } = useParams<{ quizId: string }>(); // 获取 quizId
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedQuiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );

  const questionFromLocation = location.state?.question || null;
  const isNew = !questionFromLocation; // 判断是否为新建问题

  // 状态管理
  const [content, setContent] = useState<string>(isNew ? "" : questionFromLocation.title || "");
  const [points, setPoints] = useState<number>(isNew ? 0 : questionFromLocation.points || 0);
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(isNew ? false : questionFromLocation.correctAnswer || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`);
  };

  // 保存或新建问题
  const handleSave = async () => {
    const questionData = {
      questionNumber: isNew ? selectedQuiz.questions.length + 1 : questionFromLocation.questionNumber,
      title: content,
      points,
      correctAnswer,
      type: "true_false",
    };

    try {
      setLoading(true);
      setError(null);

      if (isNew) {
        // 新建问题
        const updatedQuestions = [...selectedQuiz.questions, questionData];
        const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };

        await quizClient.updateQuizAndCascadeDetails(quizId!, updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        alert("Question created successfully!");
      } else {
        // 更新现有问题
        const updatedQuestions = selectedQuiz.questions.map((q: any) =>
          q.questionNumber === questionData.questionNumber ? questionData : q
        );
        const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };

        await quizClient.updateQuizAndCascadeDetails(quizId!, updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        alert("Question updated successfully!");
      }

      // 跳转到预览页面
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`);
    } catch (err) {
      console.error("Failed to save question:", err);
      setError("Failed to save question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="true-false-editor container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger">
          {isNew ? "Create New True/False Question" : "Edit True/False Question"}
        </h3>
        <div className="d-flex align-items-center">
          <span className="me-2">pts</span>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value, 10))}
            className="form-control w-auto"
          />
        </div>
      </div>
      <p className="text-muted">
        Enter your question text, then select if True or False is the correct
        answer.
      </p>

      <form>
        {/* 问题标题和内容 */}
        <div className="mb-3">
          <ReactQuill
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Enter the question here"
          />
        </div>

        {/* True/False 选项 */}
        <div className="mb-3">
          <label className="form-label text-muted">Answers:</label>
          <div className="choices-container mt-2">
            {/* True Option */}
            <div
              className={`choice-item d-flex align-items-center border-bottom py-2 ${
                correctAnswer ? "bg-light border-success" : ""
              }`}
            >
              <span className="me-2">True</span>
              <button
                type="button"
                className={`btn ${
                  correctAnswer ? "btn-success" : "btn-outline-success"
                } me-2`}
                onClick={() => setCorrectAnswer(true)}
              >
                {correctAnswer ? "Correct Answer" : "Mark as Correct"}
              </button>
            </div>
            {/* False Option */}
            <div
              className={`choice-item d-flex align-items-center border-bottom py-2 ${
                !correctAnswer ? "bg-light border-success" : ""
              }`}
            >
              <span className="me-2">False</span>
              <button
                type="button"
                className={`btn ${
                  !correctAnswer ? "btn-danger" : "btn-outline-danger"
                } me-2`}
                onClick={() => setCorrectAnswer(false)}
              >
                {!correctAnswer ? "Correct Answer" : "Mark as Correct"}
              </button>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-outline-secondary me-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? "Saving..." : isNew ? "Create Question" : "Update Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrueFalseQuestionEditor;
