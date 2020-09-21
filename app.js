//Getting the elements
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const button_reset = document.querySelector(".btn__reset");
const keyboardButton = document.querySelectorAll(".keyrow button");
let wrongGuess = 0;

//Declaring phrases array
const phrases = [
  "chain is only as strong",
  "change is as good",
  "countenance more in sorrow",
  "daniel come to judgement",
  "diamond in the rough",
];

//generating random phrase
function getRandomPhraseAsArray(arr) {
  const randomNum = Math.floor(Math.random() * arr.length);
  randomPhrase = arr[randomNum];
  phraseCharacters = randomPhrase.split("");
  return phraseCharacters;
}

function addPhraseToDisplay(arr) {
  const ul = document.querySelector("#phrase ul");
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    li.textContent = arr[i];
    if (arr[i] != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}

//Event listener for hiding start screen overlay
button_reset.addEventListener("click", () => {
  for (let i = 0; i < keyboardButton.length; i++) {
    keyboardButton[i].style.cursor = "pointer";
  }
  const overlay = document.querySelector("#overlay");
  overlay.style.display = "none";
  wrongGuess = 0;
  const buttons = document.querySelectorAll(".keyrow button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("chosen");
    buttons[i].disabled = false;
  }
  const hearts = document.querySelectorAll(".tries img");
  for (let j = 0; j < hearts.length; j++) {
    hearts[j].src = "images/liveHeart.png";
  }
  const listItems = document.querySelectorAll("ul li");
  for (let j = 0; j < listItems.length; j++) {
    if (listItems[j] != 0) {
      listItems[j].remove();
    }
  }
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

function checkLetter(buttonSelected) {
  const letters = document.querySelectorAll(".letter");
  let letterMatch = null;
  for (let i = 0; i < letters.length; i++) {
    if (buttonSelected == letters[i].textContent) {
      letters[i].className = "letter show";
      letterMatch = letters[i].textContent;
    }
  }
  return letterMatch;
}

//adding eventlistener for button press on the screen keyboard
qwerty.addEventListener("click", (event) => {
  const buttons = document.querySelectorAll(".keyrow button");
  const buttonContent = event.target.textContent;

  if (event.target.tagName == "BUTTON") {
    event.target.style.cursor = "none";
    let letterFound = checkLetter(buttonContent);
    for (let i = 0; i < buttons.length; i++) {
      event.target.className = "chosen";
      event.target.disabled = true;
    }

    //update wrongguess based on user action
    const hearts = document.querySelectorAll(".tries img");
    if (letterFound == null) {
      hearts[wrongGuess].src = "images/lostHeart.png";
      hearts.length--;
      wrongGuess += 1;
    }

    const letters = document.querySelectorAll(".letter");
    const show = document.querySelectorAll(".show");

    //check if user won the game or not
    function checkWin() {
      let overlay = document.querySelector("#overlay");
      let overlayTitle = document.querySelector(".title");
      if (show.length == letters.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        overlayTitle.textContent = "You Win !";
        button_reset.textContent = "New Game";
      } else if (wrongGuess >= 5) {
        overlay.className = "lose";
        overlay.style.display = "flex";
        overlayTitle.textContent = "Game Over ";
        button_reset.textContent = "Try Again";
      }
    }
    checkWin();
  }
});
