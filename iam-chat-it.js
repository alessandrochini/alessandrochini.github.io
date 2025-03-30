document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("ai-question");
  const output = document.getElementById("ai-response");

  let cvData = null;

  fetch("assets/cv-data-it.json")
    .then((res) => res.json())
    .then((data) => {
      cvData = data;
    });

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const question = input.value.trim().toLowerCase();
      if (!question || !cvData) {
        output.textContent = "Dati del CV non disponibili o domanda vuota.";
        return;
      }

      let response = "Non ho trovato una risposta precisa, ma posso aiutarti con esperienze, studi o competenze.";

      // Ricerca nel sommario
      if (cvData.summary && cvData.summary.toLowerCase().includes(question)) {
        response = cvData.summary;
      }

      // Ricerca nell'esperienza
      for (const exp of cvData.experience || []) {
        const fullText = Object.values(exp).join(" ").toLowerCase();
        if (fullText.includes(question)) {
          response = `Esperienza:\n${exp.role} – ${exp.company} – ${exp.period} – ${exp.location} – ${exp.description}`;
        }
      }

      // Ricerca nell'istruzione
      for (const edu of cvData.education || []) {
        const fullText = Object.values(edu).join(" ").toLowerCase();
        if (fullText.includes(question)) {
          response = `Formazione:\n${edu.degree} – ${edu.institution} – ${edu.period} – ${edu.focus}`;
        }
      }

      // Ricerca nelle competenze
      for (const skill of cvData.skills || []) {
        if (skill.toLowerCase().includes(question)) {
          response = `Competenze:\n${skill}`;
        }
      }

      // Ricerca nelle lingue
      for (const lang of cvData.languages || []) {
        const values = typeof lang === "string" ? lang : Object.values(lang).join(" ");
        if (values.toLowerCase().includes(question)) {
          response = `Lingua:\n${values}`;
        }
      }

      output.textContent = `🔎 Risposta:\n\n${response}`;
      input.value = "";
    }
  });
});





