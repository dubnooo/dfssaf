document.addEventListener('DOMContentLoaded', () => {

   
const questions = [
  {
    question: "Це що за персонаж?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Minecraft_cover.png",
    emoji: "🧀👑",
    answers: ["голден чіз", "якісь сир", "моцарелла", "де я"],
    correct: "голден чіз",
    info: "голден чіз",
  },
  {
    question: "Головний вокалоїд?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Among_Us_cover_art.jpg",
    emoji: "🎤",
    answers: ["міку", "неру", "не знаю", "гуми"],
    correct: "міку",
    info: "головний персонаж поп музики (японія/корея)"
  },
  {
    question: "Хто був в роблоксі коли він був не реєстрований?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Roblox_Logo_2022.svg",
    emoji: "👩‍🦲",
    answers: ["Noob", "гість", "сам роблокс", "я"],
    correct: "гість",
    info: "гість- це аккаунт якій не реєстрований."
  },
  {
    question: "[Хто це із Spooky mont?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Fortnite_Battle_Royale.png",
    emoji: "💀",
    answers: ["памп", "відьма", "скіп", "хулігани"],
    correct: "скіп",
    info: "скіп - друг пампа."
  },
  {
    question: "Хто продає ice cream в Play Togeder?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "🍧🍨",
    answers: ["Miss Cream", "хто це", "що за копія міку", "еаеаеаеаеае"],
    correct: "Miss Cream",
    info: "морозив."
  },
 
   {
    question: "Хакер роблоксу?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "😈",
    answers: ["кулкід", "1х1х1х1", "джон доу", "всі"],
    correct: "всі",
    info: "бобокс."
  },
  
    {
    question: "Уга буга?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "ааа",
    answers: ["уга буга", "фу не страшно", "НА ЩО ТАК ЛЯКАТИ", "ААА"],
    correct: "уга буга",
    info: "уга буга."
  },
  {
    question: "Головний мем на хелувіен?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "УГА БУГА",
    answers: ["спуки скері скелетон💀", "паук", "однокласник із школи", "не шарю"],
    correct: "спуки скері скелетон💀",
    info: "скелед."
  },
   {
    question: "Сімейка___?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "там є венздей",
    answers: ["адамс", "адас", "монстри", "не шарю"],
    correct: "адамс",
    info: "адамс."
  },
  
   {
    question: "...?",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Super_Mario_Odyssey.jpg",
    emoji: "що",
    answers: ["що", "що", "що", "що"],
    correct: "що",
    info: "що."
  },
  
  
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const image = document.getElementById("game-image");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("question-number").textContent =
    `Запитання ${currentQuestion + 1} з ${questions.length}`;

  document.getElementById("score").textContent = `⭐ Бали: ${score}`;

  document.getElementById("progress").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = q.question;
  image.alt = `Картинка до запитання: ${q.correct}`;
  image.onerror = () => {
    image.onerror = null;
    image.src =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300">
          <rect width="100%" height="100%" fill="#25223e"/>
          <text x="50%" y="50%" text-anchor="middle"
            dominant-baseline="middle" font-size="100">${q.emoji}</text>
        </svg>
      `);
  };
  image.src = q.image;

  feedback.textContent = "";
  answersBox.innerHTML = "";
  nextBtn.hidden = true;

  q.answers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => checkAnswer(button, answer));

    answersBox.appendChild(button);
  });
}

function checkAnswer(button, answer) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (answer === q.correct) {
    score++;
    feedback.textContent = "молодец холодець";
    feedback.style.color = "#4ade80";
  } else {
    button.classList.add("wrong");
    feedback.textContent = `не правда`;
    feedback.style.color = "#f87171";
  }

  const explanation = document.createElement("p");
  explanation.textContent = q.info;
  explanation.style.color = "#d0cce8";
  explanation.style.textAlign = "center";
  explanation.style.lineHeight = "1.6";
  feedback.appendChild(explanation);

  document.getElementById("score").textContent = `⭐ Бали: ${score}`;
  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "Побачити результат 🏆"
      : "Наступне запитання ➜";

  nextBtn.hidden = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quiz.hidden = true;
  result.hidden = false;

  document.getElementById("progress").style.width = "100%";
  document.getElementById("final-score").textContent =
    `${score} з ${questions.length} балів`;

  let message;

  if (score === 5) {
    message = "🔥 Неймовірно! Ти справжній знавець персонажів!";
  } else if (score >= 3) {
    message = "🎉 гуд job!";
  } else {
    message = "🎮 Гарна спроба! іди вчись!";
  }

  document.getElementById("result-message").textContent = message;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quiz.hidden = false;
  result.hidden = true;
  showQuestion();
});

showQuestion();
});
