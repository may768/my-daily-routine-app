import React, { useState, useEffect } from 'react';
import './App.css';
import Quiz from './Quiz';
import Journal from './Journal';
function App() {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});
const [suggestion, setSuggestion] = useState("Select your mood to get a suggestion.");

const getSuggestion = (mood) => {
  switch (mood) {
    case "happy":
      return "🌈 You're glowing! Reflect on what made you happy today in your journal.";
    case "sad":
      return "😌 It's okay to feel this way. Try journaling or listening to a calming mantra.";
    case "stressed":
      return "🧘‍♀️ Breathe in... Breathe out. Try a short meditation break.";
    case "tired":
      return "💤 Rest is important. Hydrate, nap, or listen to a peaceful tune.";
    case "energetic":
      return "🚀 Channel your energy! Do something productive or go for a quick walk!";
    default:
      return "🤔 Not sure what to suggest. Please select your mood.";
  }
};

const setMood = (mood) => {
  const moodSuggestion = getSuggestion(mood);
  setSuggestion(moodSuggestion);

  const history = JSON.parse(localStorage.getItem("moodHistory") || "[]");
  history.push({ mood, date: new Date().toLocaleString() });
  localStorage.setItem("moodHistory", JSON.stringify(history));
};

useEffect(() => {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
};

  const [reminderText, setReminderText] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Notification checking logic
  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM" format

      reminders.forEach((reminder) => {
        if (reminder.time === currentTime && !reminder.notified) {
          new Notification("⏰ Reminder", { body: reminder.text });

          const audio = new Audio('/reminder-sound.mp3');
          audio.play();

          reminder.notified = true;
          setReminders([...reminders]);
        }
      });
    }, 60000);

    return () => clearInterval(checkReminders);
  }, [reminders]);

  const addReminder = () => {
    if (reminderText.trim() && reminderTime) {
      setReminders([
        ...reminders,
        { text: reminderText, time: reminderTime, notified: false }
      ]);
      setReminderText("");
      setReminderTime("");
    }
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
  };

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask("");
    }
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="app-container">
      <header className="header">
        <button className="theme-toggle" onClick={toggleTheme}>
  {theme === "light" ? "🌙 Night Mode" : "☀️ Day Mode"}
</button>
<section className="section">
  <h2>🧠 Mood-Based Suggestions</h2>
  <div className="mood-buttons">
    <button onClick={() => setMood("happy")}>😊 Happy</button>
    <button onClick={() => setMood("sad")}>😔 Sad</button>
    <button onClick={() => setMood("stressed")}>😠 Stressed</button>
    <button onClick={() => setMood("tired")}>😴 Tired</button>
    <button onClick={() => setMood("energetic")}>🤩 Energetic</button>
  </div>
  <div className="suggestion-box">{suggestion}</div>
</section>



        <h1>🧘 My Daily Routine</h1>
        <p>Plan your day, stay on track, and live better.</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>📋 Daily Tasks</h2>
          <div className="task-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a task..."
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className={task.done ? "done" : ""}>
                <span onClick={() => toggleDone(index)}>{task.text}</span>
                <button onClick={() => deleteTask(index)}>❌</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>⏰ Reminders</h2>
          <div className="reminder-input">
            <input
              type="text"
              placeholder="Reminder (e.g., Drink water)"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
            />
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
            <button onClick={addReminder}>Add</button>
          </div>
          <ul className="reminder-list">
            {reminders.map((reminder, index) => (
              <li key={index}>
                ⏰ {reminder.time} — {reminder.text}
                <button onClick={() => deleteReminder(index)}>❌</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section">
          <h2>🧠 Quiz Mode</h2>
          <Quiz />
        </section>

        <section className="section">
  <Journal />
</section>


      
      </main>

      <footer className="footer">
        &copy; 2025 My Daily Routine | Contact: mayankchitra3@gmail.com
      </footer>
    </div>
  );
}

export default App;
