import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuizDetails, updateQuizDetails } from "./DetailsReducer";
import * as quizClient from "./client";

const QuizDetailsEditor = () => {
  const { cid } = useParams<{ cid: any}>();
  const { quizId } = useParams<{ quizId: any }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizDetails = useSelector((state: any) => state.detailsReducer.details);
  const [loading, setLoading] = useState(true);
  const [detailId, setDetailId] = useState<any | null>(null);

  // Fetch or initialize quiz details
  useEffect(() => {
    const fetchOrInitializeQuizDetails = async () => {
      try {
        setLoading(true);
        if (quizId) {
          const data = await quizClient.getQuizDetailsByQuizId(quizId);
          dispatch(setQuizDetails(data));
          setDetailId(data._id);
        } else {
          const newQuizDetails = {
            _id: "",
            quizNumber: "",
            module: "",
            course: cid || "",
            title: "",
            quizType: "Graded Quiz",
            points: 0,
            assignmentGroup: "Quizzes",
            shuffleAnswers: false,
            timeLimit: 20,
            multipleAttempts: false,
            howManyAttempts: 1,
            showCorrectAnswers: false,
            accessCode: "",
            oneQuestionAtATime: false,
            webcamRequired: false,
            lockQuestionsAfterAnswering: false,
            dueDate: "",
            availableDate: "",
            untilDate: "",
            assignTo: "Everyone",
            instruction: "",
          };
          dispatch(setQuizDetails(newQuizDetails));
        }
      } catch (error) {
        console.error("Failed to fetch or initialize quiz details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrInitializeQuizDetails();
  }, [quizId, cid, dispatch]);

  const handleInputChange = (field: string, value: any) => {
    dispatch(updateQuizDetails({ [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (detailId) {
        await quizClient.updateQuizDetails(detailId, quizDetails);
        alert("Quiz details updated successfully!");
      } else {
        const newQuiz = await quizClient.createQuizDetails({
          ...quizDetails,
          course: cid,
        });
        alert("New quiz created successfully!");
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
      }
    } catch (error) {
      console.error("Failed to save quiz details:", error);
      alert("Failed to save quiz details. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  if (loading) return <div>Loading quiz details...</div>;

  return (
    <div className="quiz-details-editor container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-front fw-bold mb-0">Edit Quiz Details</h3>
        <div className="d-flex align-items-center">
          <div className="me-3">
            <strong>Points:</strong> {quizDetails.points || 0}
          </div>
          <div className="me-3">
            <span
              className={`badge ${
                quizDetails.isPublished ? "bg-success" : "bg-secondary"
              }`}
            >
              {quizDetails.isPublished ? "Published" : "Not Published"}
            </span>
          </div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => alert("Menu options not yet implemented")}
          >
            &#8942;
          </button>
        </div>
      </div>

      <hr />

      {/* Quiz Title */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Quiz Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={quizDetails.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      {/* Quiz Instructions */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Quiz Instructions</label>
        <ReactQuill
          value={quizDetails.instruction || ""}
          onChange={(value) => handleInputChange("instruction", value)}
          modules={{
            toolbar: {
              container: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
              ],
            },
          }}
          formats={["bold", "italic", "underline", "list", "bullet", "link"]}
          className="quill-editor"
          style={{ fontSize: "14px", border: "1px solid #ced4da" }}
        />
      </div>

      {/* Quiz Type */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Quiz Type</label>
        <select
          className="form-select"
          name="quizType"
          value={quizDetails.quizType || "Graded Quiz"}
          onChange={(e) => handleInputChange("quizType", e.target.value)}
        >
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Ungraded Survey">Ungraded Survey</option>
        </select>
      </div>

      {/* Assignment Group */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Assignment Group</label>
        <select
          className="form-select"
          name="assignmentGroup"
          value={quizDetails.assignmentGroup || "Quizzes"}
          onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
        >
          <option value="Quizzes">Quizzes</option>
          <option value="Exams">Exams</option>
          <option value="Assignments">Assignments</option>
          <option value="Project">Project</option>
        </select>
      </div>
      {/* Options */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Options</label>
        {/* Shuffle Answers */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="shuffleAnswers"
            checked={quizDetails.shuffleAnswers || false}
            onChange={(e) =>
              handleInputChange("shuffleAnswers", e.target.checked)
            }
          />
          <label className="form-check-label" htmlFor="shuffleAnswers">
            Shuffle Answers
          </label>
        </div>
        {/* Time Limit */}
        <div className="d-flex align-items-center mt-3">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="timeLimit"
            checked={quizDetails.timeLimit !== null}
            onChange={(e) =>
              handleInputChange("timeLimit", e.target.checked ? 20 : null)
            }
          />
          <label className="form-check-label me-2" htmlFor="timeLimit">
            Time Limit
          </label>
          <input
            type="number"
            className="form-control"
            style={{ width: "80px" }}
            value={quizDetails.timeLimit || ""}
            onChange={(e) =>
              handleInputChange("timeLimit", parseInt(e.target.value, 10) || 0)
            }
            disabled={quizDetails.timeLimit === null}
          />
          <span className="ms-2">Minutes</span>
        </div>
        {/* Allow Multiple Attempts */}
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="multipleAttempts"
            checked={quizDetails.multipleAttempts || false}
            onChange={(e) => {
              handleInputChange("multipleAttempts", e.target.checked);
              if (!e.target.checked) {
                // 如果未勾选，则将 howManyAttempts 重置为 1
                handleInputChange("howManyAttempts", 1);
              }
            }}
          />
          <label className="form-check-label" htmlFor="multipleAttempts">
            Allow Multiple Attempts
          </label>
        </div>
        {/* Maximum Attempts */}
        <div className="form-group mt-3">
          <label className="form-label fw-bold">Maximum Attempts</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={quizDetails.howManyAttempts || 1}
            onChange={(e) =>
              handleInputChange(
                "howManyAttempts",
                parseInt(e.target.value, 10) || 1
              )
            }
            disabled={!quizDetails.multipleAttempts} // 当 multipleAttempts 未勾选时禁用输入框
          />
        </div>
      </div>

      {/* Assign Section */}
      <div className="form-group mb-5">
        <label className="form-label fw-bold">Assign</label>
        <div className="border p-3 rounded">
          <div className="form-group mb-3">
            <label className="form-label">Assign to</label>
            <input
              type="text"
              className="form-control"
              value={quizDetails.assignTo || "Everyone"}
              onChange={(e) => handleInputChange("assignTo", e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Due</label>
            <input
              type="date"
              className="form-control"
              value={quizDetails.dueDate || ""}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
            />
          </div>
          <div className="form-group d-flex justify-content-between mb-3">
            <div className="me-2" style={{ width: "48%" }}>
              <label className="form-label">Available from</label>
              <input
                type="date"
                className="form-control"
                value={quizDetails.availableDate || ""}
                onChange={(e) =>
                  handleInputChange("availableDate", e.target.value)
                }
              />
            </div>
            <div style={{ width: "48%" }}>
              <label className="form-label">Until</label>
              <input
                type="date"
                className="form-control"
                value={quizDetails.untilDate || ""}
                onChange={(e) => handleInputChange("untilDate", e.target.value)}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline-secondary"
              onClick={() => alert("Add functionality not yet implemented.")}
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-5">
        <button className="btn btn-light me-3" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizDetailsEditor;
