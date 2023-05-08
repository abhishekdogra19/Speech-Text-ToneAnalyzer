const btnEl = document.getElementById("voice-text");
const textEl = document.getElementById("convert-text");
const analyzeBtn = document.getElementById("analyze-btn");
const resultScore = document.getElementById("result-score");
const resultContainer = document.getElementById("result-container");

function converter() {
  var speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);

    textEl.innerHTML = transcript;
  });

  if (speech == true) {
    recognition.start();
  }
}

analyzeBtn.addEventListener("click", () => {
  const text = textEl.value;
  const apiKey = "8a3509aec27d9e9c5218b42af59210f7";

  fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${encodeURIComponent(
      text
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.score_tag === "N") {
        resultScore.textContent = "Negative";
        resultScore.style.color = "red";
      } else if (data.score_tag === "P") {
        resultScore.textContent = "Positive";
        resultScore.style.color = "green";
      } else {
        resultScore.textContent = "Neutral";
        resultScore.style.color = "black";
      }
      resultContainer.classList.remove("hidden");
    })
    .catch((error) => console.log(error));
});

btnEl.addEventListener("click", converter);
