document.getElementById("send").addEventListener("click", async () => {
  const userInput = document.getElementById("input").value;
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

  // Send to OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a music assistant. If the user says play, reply with a track name to simulate playing." },
        { role: "user", content: userInput }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  let simulated = "";
  if (reply.toLowerCase().includes("play")) {
    const track = reply.replace(/.*play\s/i, "").trim();
    simulated = `<br/><em>🎵 Simulated: Now playing "${track}"</em>`;
  }

  chatBox.innerHTML += `<p><strong>Bot:</strong> ${reply}${simulated}</p>`;
});
