import React, { useState } from "react";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";

const QuestionEditorPage = () => {
  const [questionType, setQuestionType] = useState("multiple_choice");

  // 渲染对应的组件
  const renderQuestionEditor = () => {
    switch (questionType) {
      case "true_false":
        return <TrueFalseQuestionEditor />;
      case "fill_the_blank":
        return <FillInTheBlankQuestionEditor />;
      default:
        return <MultipleChoiceQuestionEditor />;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Question Editor</h2>

      {/* 下拉菜单 */}
      <div className="mb-4">
        <label htmlFor="questionType" className="form-label">
          Select Question Type:
        </label>
        <select
          id="questionType"
          className="form-select"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True or False</option>
          <option value="fill_the_blank">Fill the Blank</option>
        </select>
      </div>

      {/* 渲染对应的编辑器 */}
      <div>{renderQuestionEditor()}</div>
    </div>
  );
};

export default QuestionEditorPage;
