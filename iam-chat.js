document.addEventListener("DOMContentLoaded", function () {
  const assistantInput = document.createElement("input");
  assistantInput.type = "text";
  assistantInput.placeholder = "Ask me anything about Alessandro...";
  assistantInput.style = "width: 100%; padding: 0.5rem; font-size: 1rem; margin-top: 2rem;";

  const assistantOutput = document.createElement("div");
  assistantOutput.id = "assistant-output";
  assistantOutput.style = "margin-top: 1rem; font-size: 1rem; color: #222; background: #f0f0f0; padding: 1rem; border-radius: 8px; white-space: pre-wrap;";

  const container = document.getElementById("chat-placeholder");
  container.appendChild(assistantInput);
  container.appendChild(assistantOutput);

  // Caricamento CV
  fetch("assets/cv-data.json")
    .then(response => response.json())
    .then(data => {
      const options = {
        includeScore: true,
        threshold: 0.3,
        keys: [
          "about",
          "skills",
          "education.degree",
          "education.details",
          "experience.role",
          "experience.company",
          "experience.details",
          "languages"
        ]
      };

      const fuse = new Fuse([data], options); // indice completo

      assistantInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const query = assistantInput.value.trim();
          if (!query) return;

          const results = fuse.search(query);
          if (results.length > 0) {
            const match = results[0].item;
            const responseParts = [];

            if (query.toLowerCase().includes("experience") && match.experience) {
              match.experience.forEach(exp => {
                responseParts.push(`🧑‍💼 ${exp.role} at ${exp.company}\n${exp.details}`);
              });
            } else if (query.toLowerCase().includes("education") && match.education) {
              match.education.forEach(ed => {
                responseParts.push(`🎓 ${ed.degree}\n${ed.details}`);
              });
            } else if (query.toLowerCase().includes("skill") && match.skills) {
              responseParts.push("💡 Skills:\n" + match.skills.join(", "));
            } else if (query.toLowerCase().includes("language") && match.languages) {
              responseParts.push("🌍 Languages:\n" + match.languages.join(", "));
            } else {
              responseParts.push("🔎 Here's what I found:\n");
              responseParts.push(JSON.stringify(match, null, 2));
            }

            assistantOutput.textContent = responseParts.join("\n\n");
          } else {
            assistantOutput.textContent = "I couldn’t find anything relevant in Alessandro’s CV. Try asking about experience, education, or skills.";
          }

          assistantInput.value = "";
        }
      });
    })
    .catch(error => {
      console.error("CV load error:", error);
      assistantOutput.textContent = "CV data not available.";
    });
});


