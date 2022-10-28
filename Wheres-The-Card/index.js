// Global Variables
let allCards = [];
let NUM_OF_CARDS = 8;

let cardObjectDefinitions;
let cardToFind;
let numCards;

const cardBackImgPath = "./cards/BACK.png";
let cards = [];
let cardPositions = [];

const playGameButtonElem = document.getElementById("playGame");
const mainSection = document.getElementsByTagName("main");
const cardContainerElem = document.querySelector(".card-container");
const currentGameStatusElem = document.querySelector(".current-status");
const scoreContainerElem = document.querySelector(".header-score-container");
const scoreElem = document.querySelector(".score");
const roundContainerElem = document.querySelector(".header-round-container");
const roundElem = document.querySelector(".round");
const numCardsSelectElem = document.getElementById("numCardsElem");
const selectCardsDiv = document.querySelector(".select-cards");

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const gridTemplates = {
  4: {
    areas: '"a b" "c d"',
    columns: "repeat(2, 1fr)",
    rows: "repeat(2, 1fr)",
  },
  5: {
    areas: '"a b c" "d e ."',
    columns: "repeat(3, 1fr)",
    rows: "repeat(2, 1fr)",
  },
  6: {
    areas: '"a b c" "d e f"',
    columns: "repeat(3, 1fr)",
    rows: "repeat(2, 1fr)",
  },
  7: {
    areas: '"a b c" "d e f" ". g ."',
    columns: "repeat(3, 1fr)",
    rows: "repeat(3, 1fr)",
  },
  8: {
    areas: '"a b c" "d e f" "g h ."',
    columns: "repeat(3, 1fr)",
    rows: "repeat(3, 1fr)",
  },
  9: {
    areas: '"a b c" "d e f" "g h i"',
    columns: "repeat(3, 1fr)",
    rows: "repeat(3, 1fr)",
  },
};

let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;

const winColor = "green";
const loseColor = "red";
const primaryColor = "black";

let roundNum = 0;
let maxRounds = 4;
let score = 0;

let gameObj = {};
const localStorageGameKey = "WTC";

// Main Methods
function defineCards(numCardsAsked) {
  // Say numCards=6, then get random 6 cardObjectDefinitions
  cardObjectDefinitions = [];
  numCards = 0;

  while (numCards < numCardsAsked) {
    const randomIndex = Math.floor(Math.random() * allCards.length);

    if (
      cardObjectDefinitions.findIndex((card) => card.id === randomIndex) === -1
    ) {
      cardObjectDefinitions.push(allCards[randomIndex]);
      numCards++;
    }
  }

  // Change the indexes of cardDefinition to 1...numCards
  for (let i = 0; i < numCards; i++) {
    cardObjectDefinitions[i].id = i + 1;
  }

  const cardToFindIndex = Math.floor(Math.random() * numCards);
  cardToFind = cardObjectDefinitions[cardToFindIndex];
}

function loadGame() {
  populateCards();

  playGameButtonElem.addEventListener("click", () =>
    startGame(numCardsSelectElem.value)
  );

  playGameButtonElem.style.display = "inline-block";

  updateStatusElement(scoreContainerElem, "none");
  updateStatusElement(roundContainerElem, "none");
}

function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

// Utility Methods pertaining to the Game Logic
function createCard(cardItem) {
  //create div elements that make up a card
  const cardElem = createElement("div");
  const cardInnerElem = createElement("div");
  const cardFrontElem = createElement("div");
  const cardBackElem = createElement("div");

  //create front and back image elements for a card
  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  //add class and id to card element
  addClassToElement(cardElem, "card");
  addClassToElement(cardElem, "fly-in");
  addIdToElement(cardElem, cardItem.id);

  //add class to inner card element
  addClassToElement(cardInnerElem, "card-inner");

  //add class to front card element
  addClassToElement(cardFrontElem, "card-front");

  //add class to back card element
  addClassToElement(cardBackElem, "card-back");

  //add src attribute and appropriate value to img element - back of card
  addSrcToImageElem(cardBackImg, cardBackImgPath);

  //add src attribute and appropriate value to img element - front of card
  addSrcToImageElem(cardFrontImg, cardItem.imagePath);

  //assign class to back image element of back of card
  addClassToElement(cardBackImg, "card-img");

  //assign class to front image element of front of card
  addClassToElement(cardFrontImg, "card-img");

  //add front image element as child element to front card element
  addChildElement(cardFrontElem, cardFrontImg);

  //add back image element as child element to back card element
  addChildElement(cardBackElem, cardBackImg);

  //add front card element as child element to inner card element
  addChildElement(cardInnerElem, cardFrontElem);

  //add back card element as child element to inner card element
  addChildElement(cardInnerElem, cardBackElem);

  //add inner card element as child element to card element
  addChildElement(cardElem, cardInnerElem);

  //add card element as child element to appropriate grid cell
  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);

  attatchClickEventHandlerToCard(cardElem);
}

function gameOver() {
  updateStatusElement(scoreContainerElem, "none");
  updateStatusElement(roundContainerElem, "none");
  updateStatusElement(selectCardsDiv, "block");

  const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span> Click 'Play Game' button to play again`;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    gameOverMessage
  );

  gameInProgress = false;
  playGameButtonElem.disabled = false;
  cardObjectDefinitions = undefined;
}

function endRound() {
  setTimeout(() => {
    if (roundNum == maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    saveGameObjectToLocalStorage(score, roundNum);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "Card positions revealed"
      );

      endRound();
    }, 3000);
    cardsRevealed = true;
  }
}

function calculateScoreToAdd(roundNum) {
  return (numCards * 100) / Math.pow(2, roundNum - 1);
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score<span class='badge'>${score}</span>`
  );
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      winColor,
      "Hit!! - Well Done!! :)"
    );
  } else {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      loseColor,
      "Missed!! :("
    );
  }
}

function evaluateCardChoice(card) {
  if (card.id == cardToFind.id) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function checkForIncompleteGame() {
  const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);
  if (serializedGameObj) {
    gameObj = getObjectFromJSON(serializedGameObj);

    if (gameObj.round >= maxRounds) {
      removeLocalStorageItem(localStorageGameKey);
    } else {
      if (confirm("Would you like to continue with your last game?")) {
        score = gameObj.score;
        roundNum = gameObj.round;
      }
    }
  }
}

function startGame(numOfCards) {
  defineCards(numOfCards);
  updateStatusElement(selectCardsDiv, "none");

  // numCards = 6
  const gridAreaTemplate = getGridAreaTemplate();
  transformGridArea(gridAreaTemplate);

  initializeNewGame();
  startRound();
}
function initializeNewGame() {
  score = 0;
  roundNum = 0;

  checkForIncompleteGame();

  shufflingInProgress = false;

  updateStatusElement(scoreContainerElem, "flex");
  updateStatusElement(roundContainerElem, "flex");

  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round<span class='badge'>${roundNum}</span>`
  );
}
function startRound() {
  cardPositions = [];
  // Clear all Cards InnerHTMLs
  let cardPosElems = document.querySelectorAll(".card-container>div");

  for (let i = 0; i < 9; i++) {
    cardPosElems[i].innerHTML = null;
  }

  defineCards(numCards);
  createCards();
  cards = document.querySelectorAll(".card");

  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}
function initializeNewRound() {
  roundNum++;
  playGameButtonElem.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    "Shuffling..."
  );

  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}
function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

const getGridAreaTemplate = () => gridTemplates[numCards]["areas"];

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateColumns =
    gridTemplates[numCards]["columns"];
  cardContainerElem.style.gridTemplateRows = gridTemplates[numCards]["rows"];
  cardContainerElem.style.gridTemplateAreas = areas;
}
function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove("shuffle-left");
    card.classList.remove("shuffle-right");
  });
}
function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle("shuffle-left");
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle("shuffle-right");
    card2.style.zIndex = 200;
  }
}

function shuffleCards() {
  let shuffleCount = 0;
  const id = setInterval(shuffle, 12);

  function shuffle() {
    randomizeCardPositions();

    animateShuffle(shuffleCount);

    if (shuffleCount == 500) {
      clearInterval(id);
      shufflingInProgress = false;
      removeShuffleClasses();
      dealCards();
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        `Please click the card that you think is the <b>${cardToFind.name}</b>...`
      );
    } else {
      shuffleCount++;
    }
  }
}
function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}
function returnGridAreasMappedToCardPos() {
  let firstPart, secondPart, thirdPart;
  let areas = "";

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    } else if (cardPositions[index] == 5) {
      areas = areas + "e ";
    } else if (cardPositions[index] == 6) {
      areas = areas + "f ";
    } else if (cardPositions[index] == 7) {
      areas = areas + "g ";
    } else if (cardPositions[index] == 8) {
      areas = areas + "h ";
    } else if (cardPositions[index] == 9) {
      areas = areas + "i ";
    }
  });

  switch (numCards) {
    case 4:
      firstPart = areas.substring(0, 3);
      secondPart = areas.substring(4, 7);
      break;
    case 5:
      firstPart = areas.substring(0, 5);
      secondPart = areas.substring(6, 9) + " .";
      break;
    case 6:
      firstPart = areas.substring(0, 5);
      secondPart = areas.substring(6, 11);
      break;
    case 7:
      firstPart = areas.substring(0, 5);
      secondPart = areas.substring(6, 11);
      thirdPart = ". " + areas.substring(12, 13) + " .";
      break;
    case 8:
      firstPart = areas.substring(0, 5);
      secondPart = areas.substring(6, 11);
      thirdPart = areas.substring(12, 15) + " .";
      break;
    case 9:
      firstPart = areas.substring(0, 5);
      secondPart = areas.substring(6, 11);
      thirdPart = areas.substring(12, 17);
      break;
  }

  return thirdPart === undefined
    ? `"${firstPart}" "${secondPart}"`
    : `"${firstPart}" "${secondPart}" "${thirdPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}
function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);

  const cardPosElem = document.querySelector(cardPositionClassName);
  cardPosElem.innerHTML = "";

  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card) {
  const cellMap = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
  };

  return ".card-pos-" + cellMap[card.id];
}

// Other Utility Functions
const getCardName = (cardNum, cardSuit) => {
  const faceCards = { J: "Jack", Q: "Queen", K: "King", A: "Ace" };
  const suitName = { C: "Clubs", H: "Hearts", D: "Diamonds", S: "Spades" };

  let ans;

  if (cardNum in faceCards) {
    ans = `${faceCards[cardNum]} of `;
  } else {
    ans = `${cardNum} of `;
  }

  return ans + suitName[cardSuit];
};

function populateCards() {
  // Create all 52 card objects into allCards[]
  let index = 0;
  ["C", "D", "H", "S"].forEach((cardSuit) => {
    [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"].forEach((cardNum) => {
      const newCard = {
        id: index,
        imagePath: `./cards/${cardNum}-${cardSuit}.png`,
        name: getCardName(cardNum, cardSuit),
      };
      allCards.push(newCard);
      index++;
    });
  });
}

// DOM Manipulating Functions
function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener("click", () => chooseCard(card));
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function createElement(elemType) {
  return document.createElement(elemType);
}
function addClassToElement(elem, className) {
  elem.classList.add(className);
}
function addIdToElement(elem, id) {
  elem.id = id;
}
function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}
function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

//local storage functions
function getSerializedObjectAsJSON(obj) {
  return JSON.stringify(obj);
}
function getObjectFromJSON(json) {
  return JSON.parse(json);
}
function updateLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}
function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}
function getLocalStorageItemValue(key) {
  return localStorage.getItem(key);
}

function updateGameObject(score, round) {
  gameObj.score = score;
  gameObj.round = round;
}
function saveGameObjectToLocalStorage(score, round) {
  updateGameObject(score, round);
  updateLocalStorageItem(
    localStorageGameKey,
    getSerializedObjectAsJSON(gameObj)
  );
}

loadGame();
