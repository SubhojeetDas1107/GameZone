//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const hangmanIcons = document.getElementById("hangmanIcons");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  fruits: [
    "Apple",
    "Blueberry",
    "Mandarin",
    "Pineapple",
    "Pomegranate",
    "Watermelon",
  ],
  animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
  countries: [
    "India",
    "Hungary",
    "Kyrgyzstan",
    "Switzerland",
    "Zimbabwe",
    "Dominica",
  ],
  languages: ["English", "Mandarin", "Hindi", "Spanish", "French", "Arabic", "Bengali", "Russian", "Portuguese", "Indonesian"],

  Colors: ["Red", "Blue", "Green", "White", "Black", "Voilet", "Brown", "Grey", "Pink"],
  Sports: ["Football", "Badminton", "Cricket", "Hockey", "Tennis", "Baseball", "Golf"],
  Body: ["Eyes", "Ears", "Neck", "Hands", "Legs", "Nose", "Brain"],
  Days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
};
//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayoptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    drawMan(0);
  }
  optionsContainer.appendChild(buttonCon);
};

const displayOptions2 = () => {

  let buttonCon = document.createElement("div");
  for (let value in options2) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayoptions();

  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//draw the man
const drawMan = (count) => {
  var hangmanDOM = document.querySelector('.hangmanIcons');

  hangmanDOM.style.display = 'block';

    
  switch (count) {
    case 0:
      hangmanDOM.src = 'assests/hangman-icons/hangman1.png';
      break;
    case 1:
      hangmanDOM.src = 'assests/hangman-icons/hangman2.png';
      break;
    case 2:
      hangmanDOM.src = 'assests/hangman-icons/hangman3.png';
      break;
    case 3:
      hangmanDOM.src = 'assests/hangman-icons/hangman4.png';
      break;
    case 4:
      hangmanDOM.src = 'assests/hangman-icons/hangman5.png';
      break;
    case 5:
      hangmanDOM.src = 'assests/hangman-icons/hangman6.png';
      break;
    case 6:
      hangmanDOM.src = 'assests/hangman-icons/hangman8.png';
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;

var forDark = document.getElementById("for-dark");
var forLight = document.getElementById("for-light");
function Black() {
  document.body.style.backgroundColor = "#f4c531";
  forLight.style.backgroundColor = "#333";
  forDark.style.backgroundColor = "white";

}
function White() {
  document.body.style.backgroundColor = "#333";
  forDark.style.backgroundColor = "#333";
  forLight.style.backgroundColor = "white";
}
