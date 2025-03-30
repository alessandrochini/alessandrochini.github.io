document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("ai-question");
  const output = document.getElementById("ai-response");

  let cv = null;

  fetch("assets/cv-data-it.json")
    .then(res => res.json())
    .then(data => cv = data)
    .catch(err => {
      console.error("Errore nel caricamento del CV:", err);
      output.textContent = "Spiacente, non riesco a caricare il CV.";
    });

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const q = input.value.toLowerCase();
      if (!cv) {
        output.textContent = "CV non disponibile.";
        return;
      }

      let response = "";

      if (q.includes("esperienza") || q.includes("lavoro") || q.includes("ruolo")) {
        response = `Alessandro ha maturato esperienze lavorative sia nella consulenza digitale che nel servizio clienti.
Presso OmniFast Solutions ha seguito progetti digitali, gestito contenuti e social media, e supportato la trasformazione digitale delle PMI.
In precedenza, da Yoyogurt, ha affinato capacità comunicative e di adattamento gestendo clienti in un contesto dinamico.`;
      }

      else if (q.includes("formazione") || q.includes("studio") || q.includes("università")) {
        response = `Alessandro è attualmente iscritto alla laurea in Economia e Big Data presso l’Università Roma Tre,
dove approfondisce analisi dei dati, economia digitale e strumenti come R, SQL e Python.
Ha inoltre completato un corso di Business English a New York, rafforzando le sue competenze comunicative in ambito internazionale.`;
      }

      else if (q.includes("competenze") || q.includes("punti di forza") || q.includes("abilità")) {
        response = `Alessandro unisce pensiero analitico e creatività, con competenze nella trasformazione digitale, creazione di contenuti con Canva,
ricerca di mercato e gestione social. È anche pratico nell’uso di strumenti di analisi come R, SQL e Python.`;
      }

      else if (q.includes("lingue") || q.includes("parli") || q.includes("inglese")) {
        response = `Alessandro parla fluentemente quattro lingue: Italiano (madrelingua), Inglese (C1), Spagnolo (B2) e Francese (B1),
il che gli permette di operare in contesti internazionali.`;        
      }

      else if (q.includes("chi è ") || q.includes("profilo") || q.includes("riassunto")) {
        response = `Alessandro è uno studente di economia appassionato di innovazione e strumenti digitali,
con esperienze concrete nel supporto alla digitalizzazione delle PMI.
Sa coniugare visione strategica e operatività, lavorando bene in team e contesti dinamici.`;
      }

      else {
        response = `Sono l’assistente virtuale di Alessandro. Prova a chiedermi qualcosa sulla sua esperienza, formazione, competenze o lingue —
ti aiuterò a conoscerlo meglio.`;
      }

      output.textContent = response;
      input.value = "";
    }
  });
});
