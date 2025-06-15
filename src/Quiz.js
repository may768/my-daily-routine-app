import React, { useState } from 'react';
import './Quiz.css'; // custom styles here

const questions = [
  {
    question: "Who is the charioteer of Arjuna in the Mahabharata?",
    options: ["Krishna", "Bheema", "Karna", "Drona"],
    answer: "Krishna",
  },
  {
    question: "Which Purana focuses on Lord Vishnu's avatars?",
    options: ["Shiva Purana", "Vishnu Purana", "Skanda Purana", "Agni Purana"],
    answer: "Vishnu Purana",
  },
  {
    question: "What is the central teaching of the Bhagavad Gita?",
    options: ["Worship rituals", "Selfless action and surrender to God","Rules of war","Varnashrama Dharma"],
    answer: "Selfless action and surrender to God",
  },
  {
    question: "In which chapter does Lord Krishna reveal his Vishwaroopa (Universal Form)?",
    options: ["Chapter 2", "Chapter 9", "Chapter 11", "Chapter 18"],
    answer: "Chapter 11",
  },
  {
    question: "According to the Gita, what is the true self (Atman)?",
    options: ["Eternal, unborn, indestructible", "Mortal and changing","Limited to the body","Governed by senses"],
    answer: "Eternal, unborn, indestructible",
  },
  {
    question: "Which demon will Kalki primarily defeat?",
    options: ["Kamsa", "Kali (personified evil of Kali Yuga)", "Ravana", "Duryodhana"],
    answer: "Kali (personified evil of Kali Yuga)",
  },
  {
    question: "What is the name of the village elder who will recognize Kalki's divinity?",
    options: ["Sumati", "Devapi", "Dasharatha", "Garga"],
    answer: "Sumati",
  },
  {
    question: "What will Kalki do after restoring Dharma?",
    options: ["Return to Vaikuntha", "Establish a new Satya Yuga", "Go into exile", "Start a new war"],
    answer: "Establish a new Satya Yuga",
  },
  {
    question: "Which house represents spouse/marriage?",
    options: ["6th", "5th", "7th", "9th"],
    answer: "7th",
  },
  {
    question: "Which planet is considered the significator of marriage?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Venus",
  },
  {
    question: "Which planet is associated with wealth and prosperity?",
    options: ["Sun", "Moon", "Jupiter", "Mercury"],
    answer: "Jupiter",
  },
  {
    question: "Which planet is associated with communication and intellect?",
    options: ["Sun", "Moon", "Mercury", "Venus"],
    answer: "Mercury",
  },
  {
    question: "Which nakshatra is considered very auspicious for marriage compatibility?",
    options: ["Rohini","Mula","Ardra","Ashlesha"],
    answer: "Rohini",
  },
  {
    question: "What does Krishna tell Arjuna about birth and death?",
    options: ["Soul neither dies nor is born", "All birth is suffering", "Rebirth is impossible", "Death is final"],
    answer: "Soul neither dies nor is born",
  },
  {
    question: "What happens to Arjuna's body as he prepares to fight?",
    options: ["It glows with divine energy", "It trembles, his mouth dries, and his bow slips", "He faints", "He grows angry"],
    answer: "It trembles, his mouth dries, and his bow slips",
  },
  {
    question: "What does Krishna emphasize as the duty of everyone?",
    options: ["To perform yajna", "To act according to their nature and role (svadharma)", "To avoid karma", "To meditate alone"],
    answer: "To act according to their nature and role (svadharma)",
  },
  {
    question: "What is the ultimate goal of life according to the Gita?",
    options: ["To achieve moksha (liberation)", "To accumulate wealth", "To gain power", "To enjoy worldly pleasures"],
    answer: "To achieve moksha (liberation)",
  },
  {
    question: "According to Krishna, who is superior?",
    options: ["One who renounces all work", "One who performs duty without selfishness", "The priest", "One who fasts"],
    answer: "One who performs duty without selfishness",
  },
  {
    question: "What is the attitude of a person established in yoga?",
    options: ["Feels superior to others", "Sees all beings as equal", "Judges others", "Avoids society"],
    answer: "Sees all beings as equal",
  },
  {
    question: "Who is considered dearest to Krishna?",
    options: ["One who is free from hatred, envy, ego, and is friendly to all", "The strongest warrior", "The best speaker", "The most learned"],
    answer: "One who is free from hatred, envy, ego, and is friendly to all",
  },
  {
    question: "What kind of person does Krishna describe as “My devotee is very dear to Me”?",
    options: ["Famous and rich", "Who does not disturb others and is not disturbed by the world", "Who performs fire sacrifices", "Who argues for God"],
    answer: "Who does not disturb others and is not disturbed by the world",
  },
  {
    question: "What does Krishna advise Arjuna to do?",
    options: ["Run away from the battlefield", "Fight with detachment", "Surrender to Duryodhana", "Give up his bow"],
    answer: "Fight with detachment",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      setCurrent(current + 1);
    }, 1500);
  };

  const currentQ = questions[current];

  if (!currentQ) return <div className="quiz-complete">🎉 Quiz Complete!</div>;

  return (
    <div className="quiz-box">
      <h3>{currentQ.question}</h3>
      <ul className="quiz-options">
        {currentQ.options.map((opt, i) => {
          const isCorrect = opt === currentQ.answer;
          const isSelected = selected === opt;
          const className = showResult
            ? isCorrect
              ? "correct"
              : isSelected
              ? "wrong"
              : ""
            : "";

          return (
            <li
              key={i}
              className={`option ${className}`}
              onClick={() => !showResult && handleAnswer(opt)}
            >
              {opt}
              {showResult && isSelected && !isCorrect && <span> ❌</span>}
              {showResult && isSelected && isCorrect && <span> ✅</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
