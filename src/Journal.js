import React, { useState, useEffect } from 'react';
import './Journal.css';

export default function Journal() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : {};
  });

  const [date, setDate] = useState(() => {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  });

  const [text, setText] = useState("");

  useEffect(() => {
    setText(entries[date] || "");
  }, [date]);

  const handleSave = () => {
    const updated = { ...entries, [date]: text };
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
  };

  const handleDelete = () => {
    const updated = { ...entries };
    delete updated[date];
    setEntries(updated);
    localStorage.setItem("journalEntries", JSON.stringify(updated));
    setText("");
  };

  return (
    <div className="journal-box">
      <h2>📖 My Journal</h2>
      <div className="journal-controls">
        <label>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <textarea
        className="journal-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts, reflections, or anything..."
      ></textarea>
      <div className="journal-actions">
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={handleDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
}
