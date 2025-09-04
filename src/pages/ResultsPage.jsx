import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ResultsPage() {
  const [summary, setSummary] = useState({ questions: [], answers: [] })
  const [highScores, setHighScores] = useState([])
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/questions.json')
        const questions = await res.json()
        const answers = JSON.parse(sessionStorage.getItem('quiz_answers') || '[]')
        setSummary({ questions, answers })

        const score = answers.filter(a => a?.isCorrect).length
        const prev = JSON.parse(localStorage.getItem('highScores') || '[]')
        const newScores = [...prev, { score, date: new Date().toLocaleString() }]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
        localStorage.setItem('highScores', JSON.stringify(newScores))
        setHighScores(newScores)
      } catch {}
    }
    load()
  }, [])

  if (!summary.questions.length)
    return <div className="card">No results. <Link to="/">Take quiz</Link></div>

  const score = summary.answers.filter(a => a?.isCorrect).length

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="card results-page">
      {score > summary.questions.length * 0.8 && <Confetti />}
      <h2>🎯 You scored <strong>{score}</strong> / {summary.questions.length}</h2>
      <p className="results-msg">
        {score === summary.questions.length
          ? "🏆 Perfect score! Amazing job!"
          : score > summary.questions.length / 2
            ? "👏 Good job! Keep improving!"
            : "😅 Keep practicing! Try again!"}
      </p>

      <div className="results-list">
        {summary.questions.map((q, i) => {
          const userAnswerIndex = summary.answers[i]?.selectedIndex
          const isCorrect = summary.answers[i]?.isCorrect
          return (
            <div
              key={i}
              className={`result-card ${flipped[i] ? 'flipped' : ''} ${isCorrect ? 'correct' : 'wrong'}`}
              onClick={() => toggleFlip(i)}
            >
              <div className="front">
                <div dangerouslySetInnerHTML={{ __html: `Q${i + 1}: ${q.question}` }} />
                <div>Your answer: {userAnswerIndex != null ? q.options[userAnswerIndex] : 'Not answered'}</div>
                <p className="click-hint">Click to see correct answer</p>
              </div>
              <div className="back">
                <div>Correct answer: {q.options[q.correctIndex]}</div>
                {isCorrect ? <div className="celebrate">✅ You got it!</div> : <div className="oops">❌ Better luck next time!</div>}
              </div>
            </div>
          )
        })}
      </div>

      <h3>🏅 High Scores</h3>
      <div className="high-scores">
        {highScores.map((hs, i) => (
          <div key={i} className="score-badge">{hs.score} pts — {hs.date}</div>
        ))}
      </div>

      <Link to="/" className="restart-btn" onClick={() => sessionStorage.removeItem('quiz_answers')}>
        🔄 Restart Quiz
      </Link>
    </div>
  )
}
