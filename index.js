const uppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = [
  "~",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

const passwordEl = document.querySelector("#password_display");
const clipboardEl = document.querySelector("#clipboard_btn");
const indicator = document.querySelectorAll(".indicator");
const passwordLengthEl = document.querySelector("#password_length");
const rangeEl = document.querySelector("#range_value");
const upperCaseEl = document.querySelector("#uppercase");
const lowerCaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const checkbox = document.querySelectorAll("input");
const generateBtn = document.querySelector("#generate_btn");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");

let passwordCombination = [];
let strengthPoint = 0;

passwordLengthEl.textContent = 10;
rangeEl.value = 10;
upperCaseEl.checked = true;

rangeEl.addEventListener("input", () => {
  reset();
  passwordLengthEl.textContent = rangeEl.value;
});

function strength() {
  if (rangeEl.value >= 17 && strengthPoint >= 3) {
    weak.style.backgroundColor = "#d6d6d6";
    medium.style.backgroundColor = "#d6d6d6";
    strong.style.backgroundColor = "#d6d6d6";
  } else if (rangeEl.value >= 12 && strengthPoint >= 2) {
    weak.style.backgroundColor = "#d6d6d6";
    medium.style.backgroundColor = "#d6d6d6";
  } else {
    weak.style.backgroundColor = "#d6d6d6";
  }
}

function reset() {
  for (const i of indicator) {
    i.style.backgroundColor = "transparent";
  }
}

function generatePassword() {
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].name.includes("Uppercase") && checkbox[i].checked == true) {
      passwordCombination = passwordCombination.concat(uppercase);
      strengthPoint++;
    } else if (
      checkbox[i].name.includes("Lowercase") &&
      checkbox[i].checked == true
    ) {
      passwordCombination = passwordCombination.concat(lowercase);
      strengthPoint++;
    } else if (
      checkbox[i].name.includes("Numbers") &&
      checkbox[i].checked == true
    ) {
      passwordCombination = passwordCombination.concat(numbers);
      strengthPoint++;
    } else if (
      checkbox[i].name.includes("Symbols") &&
      checkbox[i].checked == true
    ) {
      passwordCombination = passwordCombination.concat(symbols);
      strengthPoint++;
    }
  }

  if (rangeEl.value > 25) {
    passwordEl.style.fontSize = "14px";
  } else if (rangeEl.value > 15) {
    passwordEl.style.fontSize = "16px";
  } else {
    passwordEl.style.fontSize = "24px";
  }

  strength();
  strengthPoint = 0;
  passwordEl.textContent = [];

  for (let i = 0; i < rangeEl.value; i++) {
    let randomPass = Math.floor(Math.random() * passwordCombination.length);
    passwordEl.textContent += passwordCombination[randomPass];
  }
  passwordCombination = [];
}

generateBtn.addEventListener("click", generatePassword);

clipboardEl.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordEl.textContent);
  setTimeout(function () {
    navigator.clipboard.writeText("");
  }, 8000);
});
