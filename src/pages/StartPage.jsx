import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="card start-screen">
      <h2>🎉 Welcome to the Quiz App!</h2>
      <p>Test your knowledge and see how high you can score.</p>
      <button className="start-btn" onClick={() => navigate("/quiz")}>
        ▶ Click to Play Quiz
      </button>
    </div>
  );
}
