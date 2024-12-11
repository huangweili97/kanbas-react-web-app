import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as quizClient from "../Quizs/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../types";

// 定义 Attempt 类型
interface Attempt {
  courseId: any;
  studentId: any;
  quizNumber: string;
  attempts: Array<{
    attemptNumber: number;
    attemptDate: string;
    score: number;
  }>;
}

const GradePage = () => {
  const { cid } = useParams<{ cid: string }>();
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer?.currentUser
  ) as User | null;

  useEffect(() => {
    const fetchGrades = async () => {
      if (!currentUser || !currentUser._id) {
        setError("User not logged in or missing student ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("currentUser._id, cid", currentUser._id, cid);

        // Fetch attempts for the course and student
        const attemptsData: Attempt[] =
          await quizClient.getStudentAttemptsForCourse(currentUser._id, cid);
        console.log("attemptData is", attemptsData);

        const processedGrades = await Promise.all(
          attemptsData.map(async (attempt) => {
            try {
              const quiz = await quizClient.getQuizByNumber(attempt.quizNumber);
              console.log("quiz is", quiz);
              const lastAttempt = attempt.attempts[attempt.attempts.length - 1];
              return {
                quizId: quiz?._id,
                quizName: quiz?.Number || attempt.quizNumber, // fallback 使用 quizNumber
                dueDate: quiz?.dueDate
                  ? new Date(quiz.dueDate).toLocaleString()
                  : "N/A",
                lastSubmittedAt: new Date(
                  lastAttempt.attemptDate
                ).toLocaleString(),
                attemptCount: attempt.attempts.length,
                lastScore: lastAttempt.score,
                totalPoints: quiz?.totalPoints || 0,
              };
            } catch (error) {
              console.error(
                `Failed to fetch quiz details for ${attempt.quizNumber}`,
                error
              );
              return {
                quizId: null,
                quizName: attempt.quizNumber, // fallback 使用 quizNumber
                dueDate: "N/A",
                lastSubmittedAt: "N/A",
                attemptCount: attempt.attempts.length,
                lastScore: 0,
                totalPoints: 0,
              };
            }
          })
        );

        setGrades(processedGrades);
      } catch (err) {
        console.error("Failed to fetch grades:", err);
        setError("Failed to load grades. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [currentUser, cid]);

  if (loading) {
    return <div>Loading grades...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Grades</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Due Date</th>
            <th>Last Submitted</th>
            <th>Total Attempts</th>
            <th>Last Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.length > 0 ? (
            grades.map((grade, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/Kanbas/Courses/${cid}/Grades/${grade.quizId}/details`}>
                    {grade.quizName}
                  </Link>
                </td>
                <td>{grade.dueDate}</td>
                <td>{grade.lastSubmittedAt}</td>
                <td>{grade.attemptCount}</td>
                <td>{`${grade.lastScore} / ${grade.totalPoints}`}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No grade data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GradePage;
