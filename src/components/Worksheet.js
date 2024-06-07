import React, { useState } from 'react';
import Question from './Question';
import axios from 'axios';
import Score from './Score';
import NameInput from './NameInput';
import HighScores from './HighScores';
import './Worksheet.css'; // Import the stylesheet for grid layout

const questions = [
    { id: 1, question: "Round 17 to the nearest 10.", options: [10, 20, 17], answer: 20 },
    { id: 2, question: "Round 45 to the nearest 10.", options: [50, 45, 40], answer: 50 },
    { id: 3, question: "Round 75 to the nearest 10.", options: [70, 80, 175], answer: 80 },
    { id: 4, question: "Round 19 to the nearest 10.", options: [20, 10, 19], answer: 20 },
    { id: 5, question: "Round 64 to the nearest 10.", options: [64, 70, 60], answer: 60 },
    { id: 6, question: "Round 0 to the nearest 10.", options: [10, 1, 0], answer: 0 },
    { id: 7, question: "Round 98 to the nearest 10.", options: [80, 100, 89], answer: 100 },
    { id: 8, question: "Round 199 to the nearest 10.", options: [190, 100, 200], answer: 200 },
    { id: 9, question: "Round 94 to the nearest 10.", options: [100, 94, 90], answer: 90 },
    { id: 10, question: "Round 165 to the nearest 10.", options: [160, 170, 150], answer: 170 },
    { id: 11, question: "Round 445 to the nearest 10.", options: [450, 440, 500], answer: 450 },
    { id: 12, question: "Round 999 to the nearest 10.", options: [990, 1000, 909], answer: 1000 }
];

const Worksheet = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [name, setName] = useState('');

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!name) {
      alert('Please enter your name before submitting.');
      return;
    }
    const calculatedScore = answers.reduce((acc, answer, index) => (
      acc + (answer === questions[index].answer ? 1 : 0)
    ), 0);
    setScore(calculatedScore);
    axios.post('http://localhost:5000/scores', { name, score: calculatedScore })
      .then(response => {
        console.log('Score submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting score:', error);
      });
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setScore(null);
    setName('');
  };

  return (
    <div className="worksheet-container">
        <NameInput name={name} setName={setName} />
        <div className="questions-grid">

            {questions.map((q, index) => (
                <Question 
                key={q.id} 
                question={q.question} 
                options={q.options} 
                selectedAnswer={answers[index]} 
                onAnswer={(answer) => handleAnswer(index, answer)}
                />
            ))}
        </div>
        <div className='Buttons'>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        {score !== null && <Score score={score} />}
        <HighScores />
        <img src='/cowboy.png' alt='Cowgirl' className='bottom-left-image'/>
    </div>
  );
};

export default Worksheet;