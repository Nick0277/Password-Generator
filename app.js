const slider = document.querySelector("#characterLengthControl");
const output = document.querySelector(".lengthDisplay");
slider.style.background = `linear-gradient(to right, #a6ffaf ${22.5}%, #17181c ${22.5}%)`;
output.innerHTML = slider.value;

const copyPassword = document.querySelector(".copyPassword");
copyPassword.addEventListener('click', copy);

function copy() {
  var input = document.createElement('input');
  input.setAttribute('value', generatedPassword.innerHTML);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

const copyIcon = document.querySelector(".copyIcon");
copyIcon.addEventListener("mouseover", () => {
  copyIcon.src = "./media/copyIconWhite.png";
});
copyIcon.addEventListener("mouseout", () => {
  copyIcon.src = "./media/copyIconGreen.png";
})

const alphabetLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const alphabetUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ":", ";", `,`, ".", "?", "/"];
let all = [alphabetLower, alphabetUpper, numbers, symbols];

slider.oninput = function () {
  output.innerHTML = this.value;
  valPercent = (slider.value / slider.max) * 100;
  if (slider.value < 11) {
    valPercent -= 15;
  } else if (slider.value > 24) {
    valPercent -= 5;
  } else {
    valPercent -= 10;
  }
  slider.style.background = `linear-gradient(to right, #a6ffaf ${valPercent}%, #17181c ${valPercent}%)`;
  generate();
}

const includeUppercaseLetters = document.querySelector("#demo_opt_1");
const includeLowercaseLetters = document.querySelector("#demo_opt_2");
const includeNumbers = document.querySelector("#demo_opt_3");
const includeSymbols = document.querySelector("#demo_opt_4");
const generatedPasswordParent = document.querySelector(".generatedPassword");
const generatedPassword = document.querySelector(".password");

includeUppercaseLetters.addEventListener('click', () => {
  if (!all.includes(alphabetUpper)) {
    all.push(alphabetUpper);
  } else {
    all = all.filter(function (item) {
      return item !== alphabetUpper;
    });
  }
  checkmarks();
});
includeLowercaseLetters.addEventListener('click', () => {
  if (!all.includes(alphabetLower)) {
    all.push(alphabetLower);
  } else {
    all = all.filter(function (item) {
      return item !== alphabetLower;
    });
  }
  checkmarks();
});
includeNumbers.addEventListener('click', () => {
  if (!all.includes(numbers)) {
    all.push(numbers);
  } else {
    all = all.filter(function (item) {
      return item !== numbers;
    });
  }
  checkmarks();
});
includeSymbols.addEventListener('click', () => {
  if (!all.includes(symbols)) {
    all.push(symbols);
  } else {
    all = all.filter(function (item) {
      return item !== symbols;
    });
  }
  checkmarks();
});


function checkmarks() {
  if (all.length === 1) {
    if (all.includes(alphabetLower)) includeLowercaseLetters.disabled = true;
    if (all.includes(alphabetUpper)) includeUppercaseLetters.disabled = true;
    if (all.includes(numbers)) includeNumbers.disabled = true;
    if (all.includes(symbols)) includeSymbols.disabled = true;
  } else {
    if (all.includes(alphabetLower)) includeLowercaseLetters.disabled = false;
    if (all.includes(alphabetUpper)) includeUppercaseLetters.disabled = false;
    if (all.includes(numbers)) includeNumbers.disabled = false;
    if (all.includes(symbols)) includeSymbols.disabled = false;
  }
}


const generateButton = document.querySelector(".generateButton");
generateButton.addEventListener('click', generate);
let mobileViewport = window.matchMedia("(max-width: 450px)");
let mobileViewportSmall = window.matchMedia("(max-width: 365px)");
function generate() {
  let password = "";
  for (let i = 0; i < slider.value; i++) {
    let randomArray = Math.floor(Math.random() * all.length);
    let randomNum = Math.floor(Math.random() * all[randomArray].length);
    password += all[randomArray][randomNum];
  }
  generatedPassword.innerText = password;
  if (generatedPassword.innerText.length > 20 && generatedPassword.innerText.length < 26) {
    if (mobileViewport.matches) {
      generatedPasswordParent.style.fontSize = "1.2em";
    } else {
      generatedPasswordParent.style.fontSize = "1.3em";
    }
  }
  else if (generatedPassword.innerText.length > 25 && generatedPassword.innerText.length < 29) {
    if (mobileViewport.matches) {
      generatedPasswordParent.style.fontSize = "1em";
    } else {
      generatedPasswordParent.style.fontSize = "1.1em";
    }
  }
  else if (generatedPassword.innerText.length > 28) {
    if (mobileViewport.matches) {
      generatedPasswordParent.style.fontSize = "0.9em";
    }
    if (mobileViewportSmall.matches) {
      generatedPasswordParent.style.fontSize = "0.8em";
    }
    else {
      generatedPasswordParent.style.fontSize = "1em";
    }
  }
  else {
    generatedPasswordParent.style.fontSize = "";
  }
  checkStrength();
}

const strengthDifficulty = document.querySelector(".difficultyLevel");
const level1 = document.querySelector("#level1");
const level2 = document.querySelector("#level2");
const level3 = document.querySelector("#level3");
const level4 = document.querySelector("#level4");
const levels = document.querySelectorAll(".levels");

function checkStrength() {
  if (slider.value < 9) {
    strengthDifficulty.position = "absolute";
    strengthDifficulty.innerText = "EASY";
    level1.style.backgroundColor = "#e63946";
    level2.style.backgroundColor = "";
    level3.style.backgroundColor = "";
    level4.style.backgroundColor = "";
  }
  if (slider.value > 9 && slider.value < 12) {
    strengthDifficulty.position = "absolute";
    strengthDifficulty.innerText = "MEDIUM";
    level1.style.backgroundColor = "#ffbe0b";
    level2.style.backgroundColor = "#ffbe0b";
    level3.style.backgroundColor = "";
    level4.style.backgroundColor = "";
  }
  if (slider.value > 11 && slider.value < 16) {
    strengthDifficulty.position = "absolute";
    strengthDifficulty.innerText = "HARD";
    level1.style.backgroundColor = "#008000";
    level2.style.backgroundColor = "#008000";
    level3.style.backgroundColor = "#008000";
    level4.style.backgroundColor = "";
  }
  if (slider.value > 15) {
    strengthDifficulty.position = "absolute";
    strengthDifficulty.innerText = "INSANE";
    level1.style.backgroundColor = "#56cfe1";
    level2.style.backgroundColor = "#56cfe1";
    level3.style.backgroundColor = "#56cfe1";
    level4.style.backgroundColor = "#56cfe1";
  }
}
// generates new password after refreshing the page
generate();
