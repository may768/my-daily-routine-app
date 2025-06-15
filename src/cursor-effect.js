let mode = "day"; // Default mode

function setCursorEffect(currentMode) {
  mode = currentMode;

  document.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("div");
    sparkle.className = mode === "night" ? "star" : "sparkle";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });
}

// Expose the function to window so you can call it on mode switch
window.setCursorEffect = setCursorEffect;
