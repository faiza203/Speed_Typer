
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreDoc = document.getElementById("score");
const timeDoc = document.getElementById("time");
const endgameDoc = document.getElementById("endgame_main");
const settingsBtn = document.getElementById("settings_button");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const levelsDoc = document.getElementById("levelsDoc");
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];
let randomWord = "";
let score = 0;
let time = 10;
let level =
  localStorage.getItem("level") !== null
    ? localStorage.getItem("level")
    : "easy";
level.value =
  localStorage.getItem("level") !== null
    ? localStorage.getItem("level")
    : "medium";
text.focus();
const timeInterval = setInterval(updateTime, 1000);
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
function updateScore() {
  score++;
  scoreDoc.innerHTML = score;
}
function updateTime() {
  time--;
  timeDoc.innerHTML = time + "s";

  if (time  === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endgameDoc.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endgameDoc.style.display = "flex";
}
addWordToDOM();
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    if (level.value === "hard") {
      time += 2;
    } else if (level.value === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
settingsForm.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("level", level);
});
