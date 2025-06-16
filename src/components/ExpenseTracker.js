// src/components/ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

function ExpenseTracker() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount || !date || !type) return;

    let parsedAmount = parseFloat(amount);
    if (type === "expense" && parsedAmount > 0) {
      parsedAmount *= -1;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parsedAmount,
      date,
      type,
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
    setDate("");
    setType("expense");
  };

  const deleteTransaction = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      setTransactions(transactions.filter((item) => item.id !== id));
    }
  };

  const amountSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  return (
    <div className="tracker">
      <h2>💰 Budget Tracker</h2>

      <div className="summary-dashboard">
        <div className="summary-card spent-card">
          <h4>Amount Spent</h4>
          <p className="amount-spent">₹{amountSpent.toFixed(2)}</p>
        </div>
        
      </div>

      <form onSubmit={addTransaction} className="form">
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <button type="submit">Add Transaction</button>
      </form>

      <ul className="list">
        {transactions.map((item) => (
          <li key={item.id} className={item.amount < 0 ? 'minus' : 'plus'}>
            <div className="item-details">
              <span className="text">{item.text}</span>
              <span className="date">📅 {item.date}</span>
            </div>
            <div className="item-meta">
              <span className="amount">₹{item.amount.toFixed(2)}</span>
              <button onClick={() => deleteTransaction(item.id)}>❌</button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
 

  );
}

export default ExpenseTracker;

