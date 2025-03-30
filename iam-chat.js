document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("ai-question");
  const output = document.getElementById("ai-response");

  let cv = null;

  fetch("assets/cv-data.json")
    .then(res => res.json())
    .then(data => cv = data)
    .catch(err => {
      console.error("Error loading CV:", err);
      output.textContent = "Sorry, I couldn't load the CV.";
    });

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const q = input.value.toLowerCase();
      if (!cv) {
        output.textContent = "CV not available.";
        return;
      }

      let response = "";

      if (q.includes("experience") || q.includes("job") || q.includes("work")) {
        response = `Alessandro has gained relevant work experience in both digital consultancy and customer service roles. 
At OmniFast Solutions, he has worked on digital projects, managed social media, supported clients, and contributed to the digitalization process of small businesses. 
Previously, at Yoyogurt, he developed strong communication skills and adaptability by handling customer service in a fast-paced retail environment.`;
      }

      else if (q.includes("education") || q.includes("study") || q.includes("university")) {
        response = `Alessandro is currently pursuing a Bachelor's Degree in Economics and Big Data at Roma Tre University, 
where he's developing strong foundations in data analysis, digital economy, and programming tools such as R, SQL, and Python. 
He also completed a Business English course in New York, which enhanced his communication skills in international contexts.`;
      }

      else if (q.includes("skills") || q.includes("strengths") || q.includes("what can you do")) {
        response = `He combines analytical thinking with creativity, offering skills in digital transformation, content creation with Canva, 
market research, and social media management. He’s also familiar with data analysis tools like R, SQL, and Python.`;
      }

      else if (q.includes("language") || q.includes("speak") || q.includes("english")) {
        response = `Alessandro is fluent in four languages: Italian (native), English (C1), Spanish (B2), and French (B1), 
which allows him to operate in diverse international settings.`;
      }

      else if (q.includes("summary") || q.includes("who are you") || q.includes("about")) {
        response = `Alessandro is a business student passionate about innovation and digital tools, 
with real-world experience in helping SMEs evolve through technology. 
He blends strategic thinking with hands-on execution, and thrives in collaborative environments.`;
      }

      else {
        response = `I’m Alessandro’s virtual assistant. Try asking me about his education, experience, skills, or languages — 
I’ll give you a clearer picture of his background.`;
      }

      output.textContent = response;
      input.value = "";
    }
  });
});




