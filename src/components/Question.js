import React from 'react';
import './Question.css';

const Question = ({ question, options, selectedAnswer, onAnswer }) => {
  if (!options || options.length === 0) {
    return null; // Ensure options are provided
  }

  return (
    <div className="question-container">
      <p>{question}</p>
      {options.map((option, index) => (
        <label key={index}>
          <input 
            type="radio" 
            value={option} 
            checked={selectedAnswer === option} 
            onChange={() => onAnswer(option)} 
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;
