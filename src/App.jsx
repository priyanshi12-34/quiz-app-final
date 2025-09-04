import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="app-root">
      <header className="header">
        <h1>Quiz App 🎉</h1>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/results" className="nav-link">Results</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
