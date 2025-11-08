const statements = [
  { text: "طعام مغذي ثلاث مرات يوميًا", type: "need" },
  { text: "أحدث هاتف ذكي", type: "want" },
  { text: "مياه نظيفة للشرب", type: "need" },
  { text: "الاشتراك في منصة بث مدفوعة", type: "want" },
  { text: "ملابس مناسبة لكل فصل", type: "need" },
  { text: "رحلة سياحية فاخرة", type: "want" },
  { text: "سكن آمن", type: "need" },
  { text: "سيارة رياضية جديدة", type: "want" },
  { text: "خدمات رعاية صحية أساسية", type: "need" },
  { text: "شراء ألعاب فيديو جديدة", type: "want" },
  { text: "التعليم الأساسي", type: "need" },
  { text: "وجبة في مطعم فاخر", type: "want" },
  { text: "دواء موصوف من الطبيب", type: "need" },
  { text: "حقيبة يد ذات علامة تجارية", type: "want" },
  { text: "وسائل نقل للوصول إلى العمل أو المدرسة", type: "need" },
  { text: "ترقية جهاز الحاسوب كل عام", type: "want" },
  { text: "دفع فاتورة الكهرباء", type: "need" },
  { text: "شراء تذاكر حفلة موسيقية", type: "want" },
  { text: "الحصول على نوم كافٍ", type: "need" },
  { text: "اشتراك في نادٍ رياضي فخم", type: "want" }
];

const startBtn = document.getElementById("startBtn");
const needBtn = document.getElementById("needBtn");
const wantBtn = document.getElementById("wantBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const setupSection = document.getElementById("setup");
const gameSection = document.getElementById("game");
const resultsSection = document.getElementById("results");

const statementEl = document.getElementById("statement");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const finalScoreEl = document.getElementById("finalScore");

let shuffledStatements = [];
let currentIndex = 0;
let score = 0;

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startGame() {
  shuffledStatements = shuffle(statements);
  currentIndex = 0;
  score = 0;
  updateProgress();
  updateScore();
  setupSection.hidden = true;
  resultsSection.hidden = true;
  gameSection.hidden = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  showStatement();
}

function showStatement() {
  const current = shuffledStatements[currentIndex];
  statementEl.textContent = current.text;
  needBtn.disabled = false;
  wantBtn.disabled = false;
  nextBtn.hidden = true;
  feedbackEl.textContent = "";
  feedbackEl.className = "";
}

function updateProgress() {
  progressEl.textContent = `السؤال ${currentIndex + 1} من ${shuffledStatements.length}`;
}

function updateScore() {
  scoreEl.textContent = `النتيجة: ${score}`;
}

function handleAnswer(choice) {
  needBtn.disabled = true;
  wantBtn.disabled = true;
  const current = shuffledStatements[currentIndex];
  const isCorrect = current.type === choice;

  if (isCorrect) {
    score += 1;
    feedbackEl.textContent = "إجابة صحيحة!";
    feedbackEl.className = "correct";
  } else {
    const correctLabel = current.type === "need" ? "احتياج" : "رغبة";
    feedbackEl.textContent = `إجابة خاطئة. الصحيح: ${correctLabel}.`;
    feedbackEl.className = "incorrect";
  }

  updateScore();

  if (currentIndex < shuffledStatements.length - 1) {
    nextBtn.hidden = false;
  } else {
    nextBtn.hidden = true;
    setTimeout(() => finishGame(), 800);
  }
}

function nextQuestion() {
  currentIndex += 1;
  updateProgress();
  showStatement();
}

function finishGame() {
  gameSection.hidden = true;
  resultsSection.hidden = false;
  finalScoreEl.textContent = `حصلت على ${score} من ${shuffledStatements.length} نقاط.`;
}

startBtn.addEventListener("click", startGame);
needBtn.addEventListener("click", () => handleAnswer("need"));
wantBtn.addEventListener("click", () => handleAnswer("want"));
nextBtn.addEventListener("click", () => {
  nextQuestion();
});
restartBtn.addEventListener("click", () => {
  setupSection.hidden = false;
  gameSection.hidden = true;
  resultsSection.hidden = true;
});

// إعداد أولي للبيانات عند تحميل الصفحة
(function init() {
  shuffledStatements = shuffle(statements);
})();
