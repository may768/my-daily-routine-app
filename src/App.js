import React, { useState, useEffect } from 'react';
import ExpenseTracker from './components/ExpenseTracker';
import Register from './components/Register';
import Login from './components/Login';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Sparkles from './components/Sparkles';

function App() {
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");
  const [mode, setMode] = useState("day"); // day or night

  // Apply background mode class to body
  useEffect(() => {
    document.body.classList.remove("day-mode", "night-mode");
    document.body.classList.add(mode === "day" ? "day-mode" : "night-mode");
  }, [mode]);

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName || currentUser.email,
          email: currentUser.email,
        };
        setUser(userData);
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("loggedInUser");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "day" ? "night" : "day"));
  };

  // If not logged in
  if (!user) {
    return authScreen === "login" ? (
      <Login
        onLogin={(u) => {
          if (u) {
            setUser(u);
            localStorage.setItem("loggedInUser", JSON.stringify(u));
          } else {
            setAuthScreen("register");
          }
        }}
        switchToRegister={() => setAuthScreen("register")}
      />
    ) : (
      <Register
        onRegister={(u) => {
          if (u) {
            setUser(u);
            localStorage.setItem("loggedInUser", JSON.stringify(u));
          }
        }}
        switchToLogin={() => setAuthScreen("login")}
      />
    );
  }

  return (
    <div className={`app-container ${mode}`}>
      <Sparkles mode={mode} />
      <header className="header">
        <h1>💸 Budget Tracker</h1>
        <p>Welcome, {user.name}!</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={toggleMode}>
          Switch to {mode === "day" ? "Night" : "Day"} Mode
        </button>
      </header>

     <main>
  <div className="expense-tracker">
    <ExpenseTracker />
  </div>
</main>

      <footer>
        &copy; Contact us: mayankchitra3@gmail.com <a href="mayankchitra3@gmail.com"> </a>
      </footer>
    </div>
  );
}

export default App;
