import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setQuizzes, toggleQuizPublish, deleteQuiz } from "./QuizReducer";
import * as quizClient from "./client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRocket,
  FaPlus,
  FaEllipsisV,
  FaRegCircle,
  FaSearch,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RootState } from "../../store";
import { User } from "../../types";

const Quizs = () => {
  const { cid } = useParams<{ cid: any }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ quizId: string | null }>({
    quizId: null,
  });
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null); // 当前高亮的菜单项

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await quizClient.getQuizzesByCourseId(cid!);
        dispatch(setQuizzes(data));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setError("Failed to fetch quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleAddQuiz = async () => {
    setLoading(true);
    try {
      const newQuizData = {
        module: "New Module",
        title: "Untitled Quiz",
        points: 0,
        isPublished: false,
        questions: [],
      };

      const newQuizDetailsData = {
        module: "New Module",
        title: "Untitled Quiz Details",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: false,
        timeLimit: 0,
        multipleAttempts: false,
        howManyAttempts: 0,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        assignTo: "Everyone",
        instruction: "No Instructions",
      };

      // 调用 API 创建 Quiz 和 Quiz Details
      const { createdQuiz, createdDetails } =
        await quizClient.createQuizWithDetails(
          cid,
          newQuizData,
          newQuizDetailsData
        );

      // 验证返回的 `createdQuiz` 是否包含 `_id` 和 `quizNumber`
      if (!createdQuiz || !createdQuiz._id || !createdQuiz.quizNumber) {
        throw new Error("Failed to retrieve newly created quiz data.");
      }

      // 刷新 Quiz 列表
      const updatedQuizzes = await quizClient.getQuizzesByCourseId(cid);
      dispatch(setQuizzes(updatedQuizzes));

      alert(`New quiz created successfully with ID: ${createdQuiz._id}`);

      // 跳转到新创建 Quiz 的编辑页面
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${createdQuiz._id}/editor`);
    } catch (error) {
      console.error("Failed to create quiz:", error);
      alert("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  const filteredQuizzes = useMemo(() => {
    if (currentUser?.role === "STUDENT") {
      // Only show published quizzes for students
      return quizzes.filter(
        (quiz: any) =>
          quiz.isPublished &&
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Show all quizzes for faculty
    return quizzes.filter((quiz: any) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quizzes, searchTerm, currentUser]);

  const handleStudentQuizClick = (quizId: string, quizStatus: any) => {
    if (quizStatus === "Closed") {
      alert("This quiz is closed and cannot be attempted.");
      return; // Prevent navigation
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/attempt`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const handleContextMenu = (quizId: string) => {
    setContextMenu({ quizId: contextMenu.quizId === quizId ? null : quizId });
    if (contextMenu.quizId !== quizId) {
      setSelectedMenu(null); // 清除高亮状态
    }
  };

  const handleMenuAction = async (action: string, quizId: any) => {
    // 确认消息内容
    const confirmMessage = {
      Edit: "Are you sure you want to edit this quiz?",
      Delete:
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      Publish:
        "Are you sure you want to toggle the publish status of this quiz?",
      Copy: "Are you sure you want to create a copy of this quiz?",
    }[action];

    // 显示确认框
    const isConfirmed = window.confirm(confirmMessage);

    // 如果用户取消操作
    if (!isConfirmed) {
      return;
    }

    setSelectedMenu(action); // 设置当前选中的菜单项
    try {
      switch (action) {
        case "Edit":
          navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
          break;
        case "Delete":
          await quizClient.deleteQuiz(quizId); // 调用 API 删除 Quiz
          const updatedQuizzes = quizzes.filter(
            (quiz: any) => quiz._id !== quizId
          );
          dispatch(setQuizzes(updatedQuizzes)); // 更新 Redux 状态
          alert("Quiz deleted successfully!");
          break;
        case "Publish":
          const quizToPublish = quizzes.find(
            (quiz: any) => quiz._id === quizId
          );
          const updatedQuiz = await quizClient.publishQuiz(
            quizId,
            !quizToPublish.isPublished
          );
          dispatch(
            setQuizzes(
              quizzes.map((quiz: any) =>
                quiz._id === quizId
                  ? { ...quiz, isPublished: updatedQuiz.isPublished }
                  : quiz
              )
            )
          );
          alert(
            `Quiz ${
              updatedQuiz.isPublished ? "published" : "unpublished"
            } successfully!`
          );
          break;
        case "Copy":
          const copiedQuiz = await quizClient.copyQuiz(quizId);
          dispatch(setQuizzes([...quizzes, copiedQuiz]));
          alert(`Quiz copied successfully with ID: ${copiedQuiz._id}`);
          break;
        default:
          console.log(`Action: ${action} for Quiz ID: ${quizId}`);
      }
    } catch (error) {
      console.error(`Failed to perform ${action} on quiz:`, error);
      alert(`Failed to ${action.toLowerCase()} quiz. Please try again.`);
    } finally {
      setContextMenu({ quizId: null }); // 关闭上下文菜单
      setSelectedMenu(null); // 清除高亮状态
    }
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div id="wd-quizzes" className="container mt-4">
      {currentUser?.role === "FACULTY" && (
        <>
          {/* 页面标题 */}
          <div className="wd-title p-3 ps-2 bg-secondary text-white rounded d-flex align-items-center">
            <h3 className="me-auto mb-0 text-black">
              <span style={{ cursor: "pointer" }}>▼ Assignment Quizzes</span>
            </h3>
            <button
              onClick={handleAddQuiz}
              className="btn btn-danger d-flex align-items-center"
            >
              <FaPlus className="me-2" /> Quiz
            </button>
          </div>

          {/* 搜索框 */}
          <div className="d-flex align-items-center my-3">
            <div className="input-group w-50">
              <span className="input-group-text">
                <FaSearch /> {/* 放大镜图标 */}
              </span>
              <input
                type="text"
                placeholder="Search for Quiz"
                className="form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Quiz 列表 */}
          <ul className="list-group">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz: any) => (
                <li
                  key={quiz._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <FaRocket className="text-success me-3" />
                    <div>
                      <h5
                        className="mb-0 quiz-title"
                        onClick={() =>
                          navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {quiz.title}
                      </h5>
                      <small className="text-muted">
                        {determineAvailability(quiz)} | Due:{" "}
                        {new Date(quiz.dueDate).toLocaleDateString()} |{" "}
                        {quiz.totalPoints} pts | {quiz.questions?.length || 0}{" "}
                        Questions
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center position-relative">
                    {quiz.isPublished ? (
                      <FaCheckCircle
                        className={`me-3 ${
                          determineAvailability(quiz) === "Closed"
                            ? "text-muted"
                            : "text-success"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(toggleQuizPublish(quiz._id))}
                      />
                    ) : (
                      <FaRegCircle
                        className="text-danger me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(toggleQuizPublish(quiz._id))}
                      />
                    )}
                    <FaEllipsisV
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleContextMenu(quiz._id)}
                    />
                    {contextMenu.quizId === quiz._id && (
                      <div
                        className="position-absolute bg-white border p-2"
                        style={{ zIndex: 10, right: "0", top: "100%" }}
                      >
                        <ul className="list-unstyled mb-0">
                          <li
                            className={`p-2 ${
                              selectedMenu === "Edit"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleMenuAction("Edit", quiz._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Edit
                          </li>
                          <li
                            className={`p-2 ${
                              selectedMenu === "Delete"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleMenuAction("Delete", quiz._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Delete
                          </li>
                          <li
                            className={`p-2 ${
                              selectedMenu === "Publish"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handleMenuAction("Publish", quiz._id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {quiz.isPublished ? "Unpublish" : "Publish"}
                          </li>
                          <li
                            className={`p-2 ${
                              selectedMenu === "Copy"
                                ? "bg-primary text-white"
                                : ""
                            }`}
                            onClick={() => handleMenuAction("Copy", quiz._id)}
                            style={{ cursor: "pointer" }}
                          >
                            Copy
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center text-muted">
                No quizzes available. Click <b>+ Quiz</b> to create a new one!
              </li>
            )}
          </ul>
        </>
      )}
      {/* Student Section */}

      {currentUser?.role === "STUDENT" && (
        <>
          {/* 页面标题 */}
          <div className="wd-title p-3 ps-2 bg-secondary text-white rounded">
            <h3 className="mb-0">Available Quizzes</h3>
          </div>

          {/* 搜索框 */}
          <div className="d-flex align-items-center my-3">
            <div className="input-group w-50">
              <span className="input-group-text">
                <FaSearch /> {/* 放大镜图标 */}
              </span>
              <input
                type="text"
                placeholder="Search for Quiz"
                className="form-control"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Quiz 列表 */}
          <ul className="list-group">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz: any) => {
                const quizStatus = determineAvailability(quiz);
                const isClosed = quizStatus === "Closed";

                return (
                  <li
                    key={quiz._id}
                    className={`list-group-item d-flex align-items-center justify-content-between ${
                      isClosed ? "disabled" : ""
                    }`}
                    style={{
                      cursor: isClosed ? "not-allowed" : "pointer",
                      opacity: isClosed ? 0.6 : 1,
                    }}
                    onClick={() => handleStudentQuizClick(quiz._id, quizStatus)}
                  >
                    <div className="d-flex align-items-center">
                      <FaRocket
                        className={`me-3 ${
                          isClosed ? "text-muted" : "text-success"
                        }`}
                      />
                      <div>
                        <h5 className="mb-1">{quiz.title}</h5>
                        <small className="text-muted">
                          <strong>Available From:</strong>{" "}
                          {new Date(quiz.availableDate).toLocaleDateString()} |{" "}
                          <strong>Due:</strong>{" "}
                          {new Date(quiz.dueDate).toLocaleDateString()} |{" "}
                          <strong>Until:</strong>{" "}
                          {new Date(quiz.availableUntil).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <span
                        className={`badge ${
                          quizStatus === "Available"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {quizStatus}
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-muted">No quizzes available.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Quizs;
