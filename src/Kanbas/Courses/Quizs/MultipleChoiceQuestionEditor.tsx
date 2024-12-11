import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateQuiz } from "./QuizReducer";
import * as quizClient from "./client";

const MultipleChoiceQuestionEditor: React.FC<{ onCancel?: () => void }> = ({
  onCancel,
}) => {
  const { cid } = useParams<{ cid: any }>();
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedQuiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );

  // 从 location.state 获取 question 参数
  const questionFromLocation = location.state?.question || null;
  const isNew = !questionFromLocation; // 判断是否为新建问题

  // 状态管理
  const [title, setTitle] = useState<string>(
    isNew ? "" : questionFromLocation.title || ""
  );
  const [points, setPoints] = useState<number>(
    isNew ? 0 : questionFromLocation.points || 0
  );
  const [choices, setChoices] = useState<string[]>(
    isNew ? [""] : questionFromLocation.choices || [""]
  );
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    isNew ? "" : questionFromLocation.correctAnswer || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 添加选项
  const addChoice = () => setChoices([...choices, ""]);

  // 更新选项内容
  const updateChoice = (index: number, text: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = text;
    setChoices(updatedChoices);
  };

  // 删除选项
  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
    if (choices[index] === correctAnswer) {
      setCorrectAnswer(""); // 如果删除的是正确答案，清空正确答案
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`);
  };

  // 保存或新建问题
  const handleSave = async () => {
    const questionData = {
      questionNumber: isNew
        ? selectedQuiz.questions.length + 1
        : questionFromLocation.questionNumber,
      title,
      points,
      choices,
      correctAnswer,
      type: "multiple_choice",
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
    <div className="multiple-choice-editor container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger">
          {isNew
            ? "Create New Multiple Choice Question"
            : "Edit Multiple Choice Question"}
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
        Enter your question and multiple answers, then select the one correct
        answer.
      </p>
      <form>
        {/* 标题和分数部分 */}
        <div className="mb-3 d-flex align-items-center">
          <ReactQuill
            value={title}
            onChange={setTitle}
            className="form-control me-2"
            theme="snow"
            placeholder="Enter question title"
          />
        </div>

        {/* 选项部分
        <div className="mb-3">
          <label className="form-label text-muted">Answers:</label>
          <div className="choices-container">
            {choices.map((choice, index) => (
              <div
                key={index}
                className={`choice-item d-flex align-items-center border-bottom py-2 ${
                  choice === correctAnswer ? "bg-light" : ""
                }`}
              >
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  placeholder={`Possible Answer ${index + 1}`}
                  className="form-control me-3"
                />
                <button
                  type="button"
                  className={`btn ${
                    choice === correctAnswer ? "btn-success" : "btn-outline-success"
                  } me-2`}
                  onClick={() => setCorrectAnswer(choice)}
                >
                  <i className="bi bi-check-circle-fill text-success"></i>
                </button>
                <button
                  type="button"
                  onClick={() => removeChoice(index)}
                  className="btn btn-outline-danger"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addChoice}
              className="btn btn-secondary mt-2"
            >
              + Add Another Answer
            </button>
          </div>
        </div> */}
        <div className="mb-3">
          <label className="form-label text-muted">Answers:</label>
          <div className="choices-container">
            {choices.map((choice, index) => (
              <div
                key={index}
                className={`choice-item d-flex align-items-center border-bottom py-2 ${
                  choice === correctAnswer
                    ? "bg-light text-success border-success"
                    : ""
                }`}
              >
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  placeholder={`Possible Answer ${index + 1}`}
                  className="form-control me-3"
                />
                <button
                  type="button"
                  className={`btn ${
                    choice === correctAnswer
                      ? "btn-success"
                      : "btn-outline-success"
                  } me-2`}
                  onClick={() => setCorrectAnswer(choice)}
                >
                  <i className="bi bi-check-circle-fill"></i>
                </button>
                {choices.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeChoice(index)}
                    className="btn btn-outline-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-danger disabled"
                    disabled
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addChoice}
              className="btn btn-secondary mt-2"
            >
              + Add Another Answer
            </button>
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
            {loading
              ? "Saving..."
              : isNew
              ? "Create Question"
              : "Update Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MultipleChoiceQuestionEditor;
