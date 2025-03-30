document.addEventListener("DOMContentLoaded", function () {
  const assistantInput = document.createElement("input");
  assistantInput.type = "text";
  assistantInput.placeholder = "Fai una domanda su Alessandro...";
  assistantInput.style = "width: 100%; padding: 0.7rem; font-size: 1rem; margin-top: 1rem; border: 1px solid #ccc; border-radius: 5px;";

  const assistantOutput = document.createElement("div");
  assistantOutput.id = "assistant-output";
  assistantOutput.style = "margin-top: 1rem; font-size: 1rem; color: #222; background: #f7f7f7; padding: 1.2rem; border-radius: 8px; white-space: pre-line;";

  const container = document.getElementById("virtual-assistant");
  container.appendChild(assistantInput);
  container.appendChild(assistantOutput);

  let cvData = null;

  fetch('assets/cv-data-it.json')
    .then(response => response.json())
    .then(data => {
      cvData = data;
    })
    .catch(error => {
      console.error("Errore nel caricamento del CV:", error);
      assistantOutput.textContent = "Errore nel caricamento del CV.";
    });

  assistantInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = assistantInput.value.toLowerCase();
      if (!cvData) {
        assistantOutput.textContent = "CV non disponibile al momento.";
        return;
      }

      const matches = [];

      if (cvData.experience) {
        cvData.experience.forEach(entry => {
          const allText = Object.values(entry).join(" ").toLowerCase();
          if (allText.includes(query)) {
            matches.push(`Alessandro ha lavorato come ${entry.role} presso ${entry.company} a ${entry.location} (${entry.period}). Si è occupato di ${entry.description.toLowerCase()}.`);
          }
        });
      }

      if (cvData.education) {
        cvData.education.forEach(entry => {
          const allText = Object.values(entry).join(" ").toLowerCase();
          if (allText.includes(query)) {
            matches.push(`Alessandro ha conseguito il titolo di ${entry.title} presso ${entry.school} (${entry.period}). Durante il percorso ha approfondito ${entry.description.toLowerCase()}.`);
          }
        });
      }

      if (cvData.skills) {
        const foundSkills = cvData.skills.filter(skill =>
          skill.toLowerCase().includes(query)
        );
        if (foundSkills.length) {
          matches.push(`Le competenze di Alessandro includono: ${foundSkills.join(", ").toLowerCase()}.`);
        }
      }

      if (cvData.languages) {
        const foundLanguages = cvData.languages.filter(lang =>
          `${lang.language} ${lang.level}`.toLowerCase().includes(query)
        );
        if (foundLanguages.length) {
          matches.push(`Alessandro parla ${foundLanguages.map(l => `${l.language} (${l.level})`).join(", ").toLowerCase()}.`);
        }
      }

      assistantOutput.textContent = matches.length
        ? matches.join("\n\n")
        : "Alessandro non sembra avere informazioni rilevanti su questo argomento nel suo CV. Prova a chiedere di esperienze, formazione o competenze.";

      assistantInput.value = "";
    }
  });
});







