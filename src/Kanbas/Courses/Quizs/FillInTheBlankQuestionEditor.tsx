import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { updateQuiz } from "./QuizReducer";
import * as quizClient from "./client";

const FillInTheBlankQuestionEditor = ({ onCancel }: any) => {
  const { cid } = useParams<{ cid: any }>();
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedQuiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === quizId)
  );

  // 判断是新建还是编辑
  const questionFromLocation = location.state?.question || null;
  const isNew = !questionFromLocation;

  // 本地状态管理
  const [questionText, setQuestionText] = useState<string>(isNew ? "" : questionFromLocation.title || "");
  const [points, setPoints] = useState<number>(isNew ? 0 : questionFromLocation.points || 0);
  const [answers, setAnswers] = useState<string[]>(isNew ? [""] : questionFromLocation.correctAnswers || [""]); // 正确答案列表
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 添加一个新的空答案
  const addAnswer = () => setAnswers([...answers, ""]);

  // 更新指定答案
  const updateAnswer = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    console.log(answers);
  };

  // 删除指定答案
  const removeAnswer = (index: number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Preview`);
  };

  // 保存问题
  const handleSave = async () => {

    
    const questionData = {
      questionNumber: isNew ? selectedQuiz.questions.length + 1 : questionFromLocation.questionNumber,
      title: questionText,
      points,
      correctAnswer: answers,
      type: "fill_in_the_blank",
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
    } catch (err: any) {
      console.error("Failed to save question:", err);
      setError("Failed to save question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-danger">
          {isNew ? "Create New Fill in the Blank Question" : "Edit Fill in the Blank Question"}
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
        Enter your question text, then select possible answers.
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form>
        {/* 问题标题和内容 */}
        <div className="mb-3">
          <label className="form-label">Question:</label>
          <ReactQuill
            value={questionText}
            onChange={setQuestionText}
            placeholder="Enter the question text with blanks."
          />
        </div>

        {/* 答案字段 */}
        <div className="mb-3">
          <label className="form-label">Possible Answers:</label>
          <div>
            {answers.map((answer, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  className="form-control"
                  placeholder={`Answer ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeAnswer(index)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="d-flex justify-content-front">
              <button
                type="button"
                onClick={addAnswer}
                className="btn btn-secondary mt-2"
              >
                + Add Another Answer
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

export default FillInTheBlankQuestionEditor;
