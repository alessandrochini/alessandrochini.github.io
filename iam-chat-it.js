document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("ai-question");
  const output = document.getElementById("ai-response");

  fetch("assets/cv-data-it.json")
    .then((response) => response.json())
    .then((cv) => {
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const question = input.value.toLowerCase();
          input.value = "";
          output.textContent = "Sto cercando una risposta...";

          const results = [];

          if (question.includes("esperienza") || question.includes("lavoro") || question.includes("omnifast")) {
            cv.experience.forEach(exp => {
              results.push(`${exp.description}`);
            });
          } else if (question.includes("studio") || question.includes("università") || question.includes("formazione")) {
            cv.education.forEach(edu => {
              results.push(`Ha studiato presso ${edu.institution}, conseguendo ${edu.degree}. Durante il periodo ${edu.period} si è concentrato su: ${edu.focus}.`);
            });
          } else if (question.includes("competenze") || question.includes("abilità") || question.includes("skill")) {
            results.push(`Le principali competenze di Alessandro includono: ${cv.skills.join(", ")}.`);
          } else if (question.includes("lingue") || question.includes("parla")) {
            const langs = cv.languages.map(lang => `${lang.language}: ${lang.level}`).join(" | ");
            results.push(`Alessandro parla: ${langs}.`);
          } else if (question.includes("chi è") || question.includes("riassunto") || question.includes("profilo")) {
            results.push(cv.summary);
          }

          output.textContent = results.length > 0
            ? `🔎 Risposta:\n\n${results.join("\n\n")}`
            : "Non ho trovato informazioni rilevanti nel CV di Alessandro. Prova con 'esperienza', 'studio', 'competenze' o 'lingue'.";
        }
      });
    })
    .catch((err) => {
      output.textContent = "Errore nel caricamento del CV.";
      console.error(err);
    });
});






