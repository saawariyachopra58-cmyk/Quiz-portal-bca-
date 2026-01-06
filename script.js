const questions = [
  {
    q: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "None"],
    answer: 0
  },
  {
    q: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: 1
  },
  {
    q: "Which is not a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: 2
  },
  {
    q: "JavaScript is used for?",
    options: ["Structure", "Styling", "Logic", "Database"],
    answer: 2
  },
  {
    q: "Which tag is used for paragraph?",
    options: ["<p>", "<h>", "<div>", "<span>"],
    answer: 0
  },
  {
    q: "CSS stands for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheet", "None"],
    answer: 0
  },
  {
    q: "Which is a database?",
    options: ["MySQL", "HTML", "CSS", "JS"],
    answer: 0
  },
  {
    q: "Which is used for backend?",
    options: ["Node.js", "CSS", "HTML", "Bootstrap"],
    answer: 0
  },
  {
    q: "Which company developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    answer: 1
  },
  {
    q: "Which symbol is used for comments in JS?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: 0
  }
];

let index = 0;
let score = 0;
let timer;
let timeLeft = 15;
let correct = 0;
let wrong = 0;

function startQuiz() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  resetTimer();
  let q = questions[index];
  document.getElementById("question").innerText = q.q;
  let optionsHTML = "";
  q.options.forEach((opt, i) => {
    optionsHTML += `<div class="option" onclick="checkAnswer(${i})">${opt}</div>`;
  });
  document.getElementById("options").innerHTML = optionsHTML;
  document.getElementById("feedback").innerText = "";
  updateProgress();
  startTimer();
}

function checkAnswer(selected) {
  clearInterval(timer);
  let correctIndex = questions[index].answer;
  let options = document.querySelectorAll(".option");

  if (selected === correctIndex) {
    options[selected].classList.add("correct");
    document.getElementById("feedback").innerText = "✅ Correct Answer";
    score++;
    correct++;
  } else {
    options[selected].classList.add("wrong");
    options[correctIndex].classList.add("correct");
    document.getElementById("feedback").innerText = "❌ Wrong Answer";
    wrong++;
  }

  setTimeout(() => {
    index++;
    index < questions.length ? loadQuestion() : showResult();
  }, 1000);
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("scoreText").innerText =
    `Score: ${score}/${questions.length}
     | Correct: ${correct}
     | Wrong: ${wrong}`;

  let msg = score >= 8 ? "Excellent 🎉" : score >= 5 ? "Good 👍" : "Needs Improvement 😐";
  document.getElementById("performance").innerText = msg;
}

function restartQuiz() {
  index = score = correct = wrong = 0;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("time").innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      wrong++;
      index++;
      index < questions.length ? loadQuestion() : showResult();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
}

function updateProgress() {
  document.getElementById("progressBar").style.width =
    ((index + 1) / questions.length) * 100 + "%";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
