function setMood(mood) {
  const suggestionBox = document.getElementById('suggestion-output');
  const suggestion = getSuggestion(mood);

  // Store mood history (optional)
  const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  history.push({ mood, date: new Date().toLocaleString() });
  localStorage.setItem('moodHistory', JSON.stringify(history));

  suggestionBox.innerText = suggestion;
}

function getSuggestion(mood) {
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
}
