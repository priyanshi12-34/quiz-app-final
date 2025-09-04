import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizReducer, initialState } from '../reducer';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

export default function QuizPage() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [resetKey, setResetKey] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadLocal() {
      try {
        const local = await fetch('/questions.json').then(r => r.json());
        dispatch({ type: 'LOAD_QUESTIONS', payload: local });
        setTimerActive(true); // start timer for first question
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      }
    }
    loadLocal();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('quiz_answers', JSON.stringify(state.answers));
  }, [state.answers]);

  if (state.loading) return <div className="card">Loading...</div>;
  if (state.error) return <div className="card">Error: {state.error}</div>;

  const q = state.questions[state.currentIndex];
  const selected = state.answers[state.currentIndex]?.selectedIndex ?? null;

  function handleSelect(i) {
    if (state.locked) return;
    dispatch({ type: 'SELECT_ANSWER', payload: i });
  }

  function handleNext() {
    if (state.currentIndex === state.questions.length - 1) {
      navigate('/results');
    } else {
      dispatch({ type: 'NEXT' });
      setResetKey(k => k + 1); // reset timer
      setTimerActive(true);     // start timer for next question
    }
  }

  function handleTimeout() {
    if (!state.locked) {
      dispatch({ type: 'SELECT_ANSWER', payload: null });
      handleNext(); // automatically go to next question when time is up
    }
  }

  return (
    <div>
      <Timer
        duration={30}
        onTimeout={handleTimeout}
        resetKey={resetKey}
        active={timerActive}
      />

      <p className="progress">
        Question {state.currentIndex + 1} / {state.questions.length}
      </p>

      <QuestionCard
        question={q}
        locked={state.locked}
        onSelect={handleSelect}
        selectedIndex={selected}
      />

      <button
        className="next-btn"
        disabled={!state.locked}
        onClick={handleNext}
      >
        {state.currentIndex === state.questions.length -1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}
