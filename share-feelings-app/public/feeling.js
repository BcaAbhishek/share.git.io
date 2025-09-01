async function loadFeelings() {
  const res = await fetch("http://localhost:5000/feelings");
  const data = await res.json();
  const container = document.getElementById("entriesContainer");
  container.innerHTML = "";

  data.forEach(f => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <p>${f.mood} ${f.text}</p>
      <button onclick="react(${f.id}, 'like')">👍 ${f.reactions.like}</button>
      <button onclick="react(${f.id}, 'love')">❤️ ${f.reactions.love}</button>
      <button onclick="react(${f.id}, 'laugh')">😂 ${f.reactions.laugh}</button>
    `;
    container.appendChild(div);
  });
}

async function submitEmotion() {
  const mood = document.getElementById("moodSelect").value;
  const text = document.getElementById("emotionInput").value;

  if (!text.trim()) return alert("Please enter your feeling");

  await fetch("http://localhost:5000/feelings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, text })
  });

  document.getElementById("emotionInput").value = "";
  loadFeelings();
}

async function react(id, type) {
  await fetch(`http://localhost:5000/feelings/${id}/react`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type })
  });
  loadFeelings();
}

window.onload = loadFeelings;
