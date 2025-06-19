import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [questions] = useState(data);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[index];

  const checkAns = (e, ans) => {
    if (lock) return;

    if (currentQuestion.answer === ans) {
      e.target.classList.add("correct");
      setScore(prev => prev + 1);
    } else {
      e.target.classList.add("wrong");

      const options = document.querySelectorAll("li");
      options.forEach((li) => {
        if (li.textContent === currentQuestion.answer) {
          li.classList.add("correct");
        }
      });
    }

    setLock(true);
  };

  const handleNext = () => {
    if (index + 1 === questions.length) {
      alert(`Quiz Completed! Your Score: ${score}/${questions.length}`);
      
      setIndex(0);
      setScore(0);
    } else {
      setIndex(prev => prev + 1);
    }

    setLock(false);

    
    const options = document.querySelectorAll("li");
    options.forEach(opt => opt.classList.remove("correct", "wrong"));
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {currentQuestion.question}</h2>
      <ul>
        <li onClick={(e) => checkAns(e, currentQuestion.option1)}>{currentQuestion.option1}</li>
        <li onClick={(e) => checkAns(e, currentQuestion.option2)}>{currentQuestion.option2}</li>
        <li onClick={(e) => checkAns(e, currentQuestion.option3)}>{currentQuestion.option3}</li>
        <li onClick={(e) => checkAns(e, currentQuestion.option4)}>{currentQuestion.option4}</li>
      </ul>
      <button onClick={handleNext}>Next</button>
      <div className="index">{index + 1} of {questions.length} questions</div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Quiz;
