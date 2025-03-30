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
      console.error("CV data load error:", error);
      assistantOutput.textContent = "Error loading CV data.";
    });

  assistantInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = assistantInput.value.trim().toLowerCase();
      if (!cvData) {
        assistantOutput.textContent = "CV data not available.";
        return;
      }

      let response = "";
      let found = false;

      // 1. Se chiedi 'experience', 'education', ecc.
      if (["experience", "education", "skills", "languages", "summary"].includes(query)) {
        const section = cvData[query];
        if (Array.isArray(section)) {
          response += `<strong>${query.charAt(0).toUpperCase() + query.slice(1)}:</strong><br>`;
          section.forEach((item, index) => {
            response += `<div style="margin-bottom: 0.5rem;">${Object.values(item).join(" – ")}</div>`;
          });
          found = true;
        } else if (typeof section === "string") {
          response = `<strong>${query.charAt(0).toUpperCase() + query.slice(1)}:</strong><br>${section}`;
          found = true;
        }
      }

      // 2. Altrimenti cerca parola chiave in tutto
      if (!found) {
        const results = [];

        for (const key in cvData) {
          const section = cvData[key];
          if (typeof section === "string" && section.toLowerCase().includes(query)) {
            results.push(`<strong>${key}:</strong><br>${section}`);
          } else if (Array.isArray(section)) {
            section.forEach((item) => {
              const text = Object.values(item).join(" ").toLowerCase();
              if (text.includes(query)) {
                results.push(`<strong>${key}:</strong><br>${Object.values(item).join(" – ")}`);
              }
            });
          }
        }

        if (results.length > 0) {
          response = `<p>🔎 Here's what I found:</p>${results.join("<br><br>")}`;
          found = true;
        }
      }

      if (!found) {
        response = "❌ I couldn’t find anything relevant in Alessandro’s CV. Try asking about <em>experience</em>, <em>Python</em>, <em>Kaplan</em>, or <em>skills</em>.";
      }

      assistantOutput.innerHTML = response;
      assistantInput.value = "";
    }
  });
});



