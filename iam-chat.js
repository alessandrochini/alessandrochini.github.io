
document.addEventListener("DOMContentLoaded", function () {
  const assistantInput = document.createElement("input");
  assistantInput.type = "text";
  assistantInput.placeholder = "Ask me anything about Alessandro...";
  assistantInput.style = "width: 100%; padding: 0.5rem; font-size: 1rem; margin-top: 2rem;";

  const assistantOutput = document.createElement("div");
  assistantOutput.id = "assistant-output";
  assistantOutput.style = "margin-top: 1rem; font-size: 1rem; color: #222; background: #f0f0f0; padding: 1rem; border-radius: 8px;";

  const container = document.getElementById("virtual-assistant");
  container.appendChild(assistantInput);
  container.appendChild(assistantOutput);

  let cvData = null;

  // Carichiamo il file JSON
  fetch('assets/cv-data.json')
    .then(response => response.json())
    .then(data => {
      cvData = data;
    })
    .catch(error => {
      console.error("Failed to load CV data:", error);
      assistantOutput.textContent = "Error loading CV data.";
    });

  assistantInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = assistantInput.value.toLowerCase();
      if (!cvData) {
        assistantOutput.textContent = "CV data not available.";
        return;
      }

      let found = false;
      const answers = [];

      for (const section in cvData) {
        if (typeof cvData[section] === "string") {
          if (cvData[section].toLowerCase().includes(query)) {
            answers.push(`📌 ${section}: ${cvData[section]}`);
            found = true;
          }
        } else if (Array.isArray(cvData[section])) {
          cvData[section].forEach(entry => {
            const values = Object.values(entry).join(" ").toLowerCase();
            if (values.includes(query)) {
              answers.push(`📌 ${section}: ${JSON.stringify(entry)}`);
              found = true;
            }
          });
        }
      }

      assistantOutput.textContent = found
        ? answers.join("\n\n")
        : "I couldn’t find anything relevant in Alessandro’s CV. Try asking about experience, education, or skills.";

      assistantInput.value = "";
    }
  });
});
