import React from 'react'

export default function QuestionCard({question, locked, onSelect, selectedIndex}) {
  if(!question) return null;
  return (
    <div className="card">
      <h2 dangerouslySetInnerHTML={{__html: question.question}} />
      <div className="options">
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          let cls = "";
          let sticker = "";

          if (locked && isSelected) {
            if (i === question.correctIndex) {
              cls = "correct";
              sticker = " ✅";
            } else {
              cls = "wrong";
              sticker = " ❌";
            }
          }

          return (
            <button
              key={i}
              className={cls}
              disabled={locked}
              onClick={() => onSelect(i)}
              dangerouslySetInnerHTML={{ __html: opt + sticker }}
            />
          );
        })}
      </div>
    </div>
  );
}
