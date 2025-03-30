document.addEventListener("DOMContentLoaded", function () {
  const assistantInput = document.getElementById("ai-question");
  const assistantOutput = document.getElementById("ai-response");

  let cvData = null;

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
            answers.push(`${section}: ${cvData[section]}`);
            found = true;
          }
        } else if (Array.isArray(cvData[section])) {
          cvData[section].forEach(entry => {
            const values = Object.values(entry).join(" ").toLowerCase();
            if (values.includes(query)) {
              answers.push(`${section}: ${Object.values(entry).join(", ")}`);
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

