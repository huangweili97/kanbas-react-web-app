import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedQuiz } from "./QuizReducer";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import QuizPreview from "./QuizPreview";
import * as quizClient from "./client";

const QuizEditor = () => {
  const { cid } = useParams<{ cid: string }>();
  const { quizId } = useParams<{ quizId: string }>();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<string>("details"); // Default to details tab
  const [selectedQuiz, setSelectedQuizState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    console.log("QuizEditor loaded with quizId:", quizId);
    const fetchOrInitializeQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
  
        if (quizId) {
          // Fetch existing quiz
          const quizData = await quizClient.getQuizById(quizId);
          setSelectedQuizState(quizData);
          dispatch(setSelectedQuiz(quizData)); // Sync with Redux
        } else {
          // Initialize a new quiz if no quizId
          const newQuiz = {
            _id: "", // Empty for a new quiz
            quizNumber: "",
            module: "",
            course: cid || "default-course", // Fallback to a default value if cid is undefined
            title: "",
            totalPoints: 0,
            questions: [],
            isPublished: false,
            availableDate: new Date().toISOString(), // Default to current date
            availableUntil: "", // Can be set later
            dueDate: "", // Can be set later
          };
          setSelectedQuizState(newQuiz);
          dispatch(setSelectedQuiz(newQuiz)); // Sync with Redux
        }
      } catch (err) {
        console.error("Error fetching or initializing quiz:", err);
        setError("Failed to fetch or initialize quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrInitializeQuiz();
  }, [quizId, cid, dispatch]);
  

  // Handle navigation between tabs
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Loading state
  if (loading) {
    return <div>Loading quiz...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="quiz-editor container mt-4">
      {/* Navigation bar */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
        <div className="nav">
          <button
            className={`nav-link ${
              activeTab === "details"
                ? "bg-light border fw-bold text-black"
                : "text-danger"
            }`}
            onClick={() => handleTabClick("details")}
          >
            Details
          </button>
          <button
            className={`nav-link ${
              activeTab === "questions"
                ? "bg-light border fw-bold text-black"
                : "text-danger"
            }`}
            onClick={() => handleTabClick("questions")}
          >
            Questions
          </button>
        </div>
      </div>
      <hr />

      {/* Render child components based on active tab */}
      {activeTab === "details" && <QuizDetailsEditor />}
      {activeTab === "questions" &&
        (selectedQuiz?.questions?.length > 0 ? (
          <QuizPreview />
        ) : (
          <QuizQuestionsEditor />
        ))}
    </div>
  );
};

export default QuizEditor;
