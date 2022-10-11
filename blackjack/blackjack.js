let isAlive = false;
let dealerAlive = false;
let coins = 100;
let cards = [];
let sum = 0;
let dealerSum = 0;
let fakeRand = 52;

const messageEl = document.getElementById('message');
const coinsEl = document.getElementById('coins');
let pointsEl = document.getElementById('points');
let dealerPoints = document.getElementById('dealerPoints');

let whoPlays = '';

const playercardsDivEl = document.getElementById('playerCards');
const dealerCardsDivEl = document.getElementById('dealerCards');
const startBtn = document.getElementById('startBtn');
const anotherCardEl = document.getElementById('anotherCardBtn');
const playAgain = document.getElementById('againBtn');
const holdBtn = document.getElementById('holdBtn');
const dealerCardsId = document.getElementById('dealerCardsId');
//audio variables
const audio = document.getElementById('cardWav');
const coinsAudio = document.getElementById('coinsAudio');
const coinsAudio2 = document.getElementById('coinsAudio2');
const coinsAudio3 = document.getElementById('coinsAudio3');
const loose1El = document.getElementById('loose1');
const loose2El = document.getElementById('loose2');
const win1El = document.getElementById('win1');
const Win2El = document.getElementById('blackJack');
const btnSound = document.getElementById('btnSound');

//event listeners
startBtn.addEventListener('click', startGame);
anotherCardEl.addEventListener('click', anotherCard);
holdBtn.addEventListener('click', dealerTurn);
playAgain.addEventListener('click', playAgainFunction);

// creating the deck
function deckBuilder() {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        for ( let s = 0; s < suits.length; s++) {
        for ( let v = 0; v < values.length; v++ ) {
            const value = values[v];
            const suit = suits[s];
            cards.push({value, suit});
        }
    }
    return cards;
}

//creates the deck
console.log(deckBuilder())

//selects a random card from the deck and renders
function randomCard(cards) {
    const randomNr = Math.floor(Math.random() * fakeRand);
    console.log(randomNr);
    const cardValue = cards[randomNr].value;
    const cardSuit = cards[randomNr].suit;
    const temp = cardValue + cardSuit;
    let kaart = ''
    console.log( temp);
    
    
    switch(temp){
        case 'AHearts': kaart = '/blackjack/cards/ace_of_hearts.png'
        if ( isAlive ) {sum += 1 }
        
        else if ( dealerAlive ) { dealerSum += 1 };   
        cards.splice(randomNr, 1);
        break;
        case '2Hearts': kaart = '/blackjack/cards/2_of_hearts.png'
        if ( isAlive ) { sum += 2 }
        else if ( dealerAlive ) { dealerSum += 2; };
        cards.splice(randomNr, 1);
        break;
        case '3Hearts': kaart = '/blackjack/cards/3_of_hearts.png'
        if ( isAlive ) { sum += 3 }
        else if ( dealerAlive ) { dealerSum += 3 };
        cards.splice(randomNr, 1);
        break;
        case '4Hearts': kaart = '/blackjack/cards/4_of_hearts.png'
        if ( isAlive ) { sum += 4 }
        else if ( dealerAlive ) { dealerSum += 4 };
        cards.splice(randomNr, 1);
        break;
        case '5Hearts': kaart = '/blackjack/cards/5_of_hearts.png'
        if ( isAlive ) { sum += 5 }
        else if ( dealerAlive ) { dealerSum += 5 };
        cards.splice(randomNr, 1);
        break;
        case '6Hearts': kaart = '/blackjack/cards/6_of_hearts.png'
        if ( isAlive ) { sum += 6 }
        else if ( dealerAlive ) { dealerSum += 6 };
        cards.splice(randomNr, 1);
        break;
        case '7Hearts': kaart = '/blackjack/cards/7_of_hearts.png'
        if ( isAlive ) { sum += 7 }
        else if ( dealerAlive ) { dealerSum += 7 };
        cards.splice(randomNr, 1);
        break;
        case '8Hearts': kaart = '/blackjack/cards/8_of_hearts.png'
        if ( isAlive ) { sum += 8 }
        else if ( dealerAlive ) { dealerSum += 8 };
        cards.splice(randomNr, 1);
        break;
        case '9Hearts': kaart = '/blackjack/cards/9_of_hearts.png'
        if ( isAlive ) { sum += 9 }
        else if ( dealerAlive ) { dealerSum += 9 };
        cards.splice(randomNr, 1);
        break;
        case '10Hearts': kaart = '/blackjack/cards/10_of_hearts.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'JHearts': kaart = '/blackjack/cards/jack_of_hearts.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'QHearts': kaart = '/blackjack/cards/queen_of_hearts.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'KHearts': kaart = '/blackjack/cards/king_of_hearts.png'
        if ( isAlive ) { sum += 10}
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'ASpades': kaart = '/blackjack/cards/ace_of_spades.png'
        if ( isAlive ) { sum += 1 }
        else if ( dealerAlive ) { dealerSum += 1 };
        cards.splice(randomNr, 1);
        break;
        case '2Spades': kaart = '/blackjack/cards/2_of_spades.png'
        if ( isAlive ) { sum += 2 }
        else if ( dealerAlive ) { dealerSum += 2 };
        cards.splice(randomNr, 1);
        break;
        case '3Spades': kaart = '/blackjack/cards/3_of_spades.png'
        if ( isAlive ) { sum += 3 }
        else if ( dealerAlive ) { dealerSum += 3 };
        cards.splice(randomNr, 1);
        break;
        case '4Spades': kaart = '/blackjack/cards/4_of_spades.png'
        if ( isAlive ) { sum += 4 }
        else if ( dealerAlive ) { dealerSum += 4 };
        cards.splice(randomNr, 1);
        break;
        case '5Spades': kaart = '/blackjack/cards/5_of_spades.png'
        if ( isAlive ) { sum += 5 }
        else if ( dealerAlive ) { dealerSum += 5 };
        cards.splice(randomNr, 1);
        break;
        case '6Spades': kaart = '/blackjack/cards/6_of_spades.png'
        if ( isAlive ) { sum += 6 }
        else if ( dealerAlive ) { dealerSum += 6 };
        cards.splice(randomNr, 1);
        break;
        case '7Spades': kaart = '/blackjack/cards/7_of_spades.png'
        if ( isAlive ) { sum += 7 }
        else if ( dealerAlive ) { dealerSum += 7 };
        cards.splice(randomNr, 1);
        break;
        case '8Spades': kaart = '/blackjack/cards/8_of_spades.png'
        if ( isAlive ) { sum += 8}
        else if ( dealerAlive ) { dealerSum += 8 };
        cards.splice(randomNr, 1);
        break;
        case '9Spades': kaart = '/blackjack/cards/9_of_spades.png'
        if ( isAlive ) { sum += 9 }
        else if ( dealerAlive ) { dealerSum += 9 };
        cards.splice(randomNr, 1);
        break;
        case '10Spades': kaart = '/blackjack/cards/10_of_spades.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'JSpades': kaart = '/blackjack/cards/jack_of_spades.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'QSpades': kaart = '/blackjack/cards/queen_of_spades.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'KSpades': kaart = '/blackjack/cards/king_of_spades.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'ADiamonds': kaart = '/blackjack/cards/ace_of_diamonds.png'
        if ( isAlive ) { sum += 1 }
        else if ( dealerAlive ) { dealerSum += 1 };
        cards.splice(randomNr, 1);
        break;
        case '2Diamonds': kaart = '/blackjack/cards/2_of_diamonds.png'
        if ( isAlive ) { sum += 2 }
        else if ( dealerAlive ) { dealerSum += 2 };
        cards.splice(randomNr, 1);
        break;
        case '3Diamonds': kaart = '/blackjack/cards/3_of_diamonds.png'
        if ( isAlive ) { sum += 3 }
        else if ( dealerAlive ) { dealerSum += 3 };
        cards.splice(randomNr, 1);
        break;
        case '4Diamonds': kaart = '/blackjack/cards/4_of_diamonds.png'
        if ( isAlive ) { sum += 4 }
        else if ( dealerAlive ) { dealerSum += 4 };
        cards.splice(randomNr, 1);
        break;
        case '5Diamonds': kaart = '/blackjack/cards/5_of_diamonds.png'
        if ( isAlive ) { sum += 5 }
        else if ( dealerAlive ) { dealerSum += 5 };
        cards.splice(randomNr, 1);
        break;
        case '6Diamonds': kaart = '/blackjack/cards/6_of_diamonds.png'
        if ( isAlive ) { sum += 6 }
        else if ( dealerAlive ) { dealerSum += 6 };
        cards.splice(randomNr, 1);
        break;
        case '7Diamonds': kaart = '/blackjack/cards/7_of_diamonds.png'
        if ( isAlive ) { sum += 7 }
        else if ( dealerAlive ) { dealerSum += 7 };
        cards.splice(randomNr, 1);
        break;
        case '8Diamonds': kaart = '/blackjack/cards/8_of_diamonds.png'
        if ( isAlive ) { sum += 8 }
        else if ( dealerAlive ) { dealerSum += 8 };
        cards.splice(randomNr, 1);
        break;
        case '9Diamonds': kaart = '/blackjack/cards/9_of_diamonds.png'
        if ( isAlive ) { sum += 9 }
        else if ( dealerAlive ) { dealerSum += 9 };
        cards.splice(randomNr, 1);
        break;
        case '10Diamonds': kaart = '/blackjack/cards/10_of_diamonds.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'JDiamonds': kaart = '/blackjack/cards/jack_of_diamonds.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'QDiamonds': kaart = '/blackjack/cards/queen_of_diamonds.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'KDiamonds': kaart = '/blackjack/cards/king_of_diamonds.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'AClubs': kaart = '/blackjack/cards/ace_of_clubs.png'
        if ( isAlive ) { sum += 1 }
        else if ( dealerAlive ) { dealerSum += 1 };
        cards.splice(randomNr, 1);
        break;
        case '2Clubs': kaart = '/blackjack/cards/2_of_clubs.png'
        if ( isAlive ) { sum += 2 }
        else if ( dealerAlive ) { dealerSum += 2 };
        cards.splice(randomNr, 1);
        break;
        case '3Clubs': kaart = '/blackjack/cards/3_of_clubs.png'
        if ( isAlive ) { sum += 3 }
        else if ( dealerAlive ) { dealerSum += 3 };
        cards.splice(randomNr, 1);
        break;
        case '4Clubs': kaart = '/blackjack/cards/4_of_clubs.png'
        if ( isAlive ) { sum += 4 }
        else if( dealerAlive ) { dealerSum += 4 };
        cards.splice(randomNr, 1);
        break;
        case '5Clubs': kaart = '/blackjack/cards/5_of_clubs.png'
        if ( isAlive ) { sum += 5 }
        else if ( dealerAlive ) { dealerSum += 5 };
        cards.splice(randomNr, 1);
        break;
        case '6Clubs': kaart = '/blackjack/cards/6_of_clubs.png'
        if ( isAlive ) { sum += 6 }
        else if ( dealerAlive ) { dealerSum += 6 };
        cards.splice(randomNr, 1);
        break;
        case '7Clubs': kaart = '/blackjack/cards/7_of_clubs.png'
        if ( isAlive ) { sum += 7 }
        else if ( dealerAlive ) { dealerSum += 7 };
        cards.splice(randomNr, 1);
        break;
        case '8Clubs': kaart = '/blackjack/cards/8_of_clubs.png'
        if ( isAlive ) { sum += 8 }
        else if ( dealerAlive ) { dealerSum += 8 };
        cards.splice(randomNr, 1);
        break;
        case '9Clubs': kaart = '/blackjack/cards/9_of_clubs.png'
        if ( isAlive ) { sum += 9 }
        else if ( dealerAlive ) { dealerSum += 9 };
        cards.splice(randomNr, 1);
        break;
        case '10Clubs': kaart = '/blackjack/cards/10_of_clubs.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'JClubs': kaart = '/blackjack/cards/jack_of_clubs.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'QClubs': kaart = '/blackjack/cards/queen_of_clubs.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
        case 'KClubs': kaart = '/blackjack/cards/king_of_clubs.png'
        if ( isAlive ) { sum += 10 }
        else if ( dealerAlive ) { dealerSum += 10 };
        cards.splice(randomNr, 1);
        break;
    }
    let newCard = document.createElement('img')
    newCard.src = kaart;
    newCard.id = 'card-id';
    setTimeout(() => {
        whoPlays.appendChild(newCard);
        
    }, 150);
    whoPlays.style.alignItems = 'center';
    dealerOrPlayer();

}

    
function startGame() {
    btnSoundFunc();
    coinsEl.innerHTML = 'coins: ' + coins;
    var audio = new Audio('/blackjack/sounds/coins7big.wav');
    audio.volume = 0.9;
    audio.play()
    startBtn.style.display = 'none';
    
    const myTimeout = setTimeout(renderGame, 1000);
    
}



function btnApear() {
    anotherCardEl.style.display = 'inline-block';
    holdBtn.style.display = 'inline-block';
}


//rendering the game
function renderGame(){
    setTimeout(() => {  btnApear(); }, 1000);
    isAlive = true;
    startBtn.style.backgroundColor = 'var(--darkgold)';
    anotherCardEl.style.backgroundColor = 'var(--gold)';
    holdBtn.style.backgroundColor = 'var(--gold)';
    coinsEl.style.visibility = 'visible';
    whoPlays = playercardsDivEl;
    pointsEl.style.visibility = 'visible';
    console.log(cards)
    //messageEl.innerHTML = 'Do you want another card?'

    var audio = new Audio('/blackjack/sounds/carddeal2.wav');
    audio.play();
    randomCard(cards);
    setTimeout(() => {  randomCard(cards); }, 400);
      
}

//hit me with another card
function anotherCard(){
    //holdBtn.style.display = 'inline-block'; ####################################### niet nodig??
    whoPlays = playercardsDivEl;
    randomCard(cards);
    audioFunc();
    console.log(cards);
}


//hold ( dealer takes turn )
function dealerTurn() {
    holdBtn.style.display = 'none';
    anotherCardEl.style.display = 'none';
    var audio = new Audio('/blackjack/sounds/carddeal1.wav');
    audio.volume = 0.2;
    audio.play();
    isAlive = false;
    dealerAlive = true;
    dealerSum = 0;
    whoPlays = dealerCardsDivEl;
    dealerCardsId.style.display = 'block';
    randomCard(cards);
    //hieronder ga ik iets proberen om de tweede dealerkaart te vertragen
    setTimeout(() => {  
        randomCard(cards);
        audio.play();
        dealerPoints.style.visibility = 'visible';
        dealerPoints.innerHTML = 'Dealers Points: ' + dealerSum;
        conditFunc();
    }, 600); 
     

}





//conditions for more dealer cards or not
function conditFunc() {
    
    if ( dealerSum > sum && dealerSum < 21 ) {
        looseSound();
        messageEl.innerHTML = 'The Dealer Won!';
        playAgain.style.display = 'inline-block'
        holdBtn.style.display = 'none'; 
        anotherCardEl.style.display = 'none';
        playAgain.style.backgroundColor = 'var(--gold)';
        coins = coins - 1;
        coinsEl.innerHTML = 'coins: ' + coins;
        dealerAlive = false;
        return dealerAlive;
    } if ( dealerSum === 21 ) {
        looseSound();
        messageEl.innerHTML = 'The Dealer Has BLACKJACK!';
        dealerAlive = false;
        coins = coins - 1;
        coinsEl.innerHTML = 'coins: ' + coins;
        holdBtn.style.display = 'none';  
        anotherCardEl.style.display = 'none'; 
        playAgain.style.display = 'inline-block';  
        playAgain.style.backgroundColor = 'var(--gold)';
        return dealerAlive; //nog nodig?
        

    } if ( dealerSum > 21 ) {
        var audio = new Audio('/blackjack/sounds/win.wav');
        audio.play();
        messageEl.innerHTML = 'You WIN!';
        holdBtn.style.display = 'none'; 
        anotherCardEl.style.display = 'none'; 
        playAgain.style.display = 'inline-block';
        playAgain.style.backgroundColor = 'var(--gold)';  
        coins = coins + 1;
        coinsSndFunc();
        coinsEl.innerHTML = 'coins: ' + coins;
        //dealerAlive = false; nog nodig?
        //return dealerAlive; nog nodig?
        
    } else {
        dealHitAgain();
        setTimeout(() => {
            conditFunc();
        }, 700);
    }
}

//dealer play again
function dealHitAgain() {
    whoPlays = dealerCardsDivEl;
    randomCard(cards);
    audioFunc();
}


//player conditional test function
function playerContFun() {
    if ( sum > 21 ) {
        looseSound();
        messageEl.innerHTML = 'You Lost';
        anotherCardEl.style.display = 'none';  
        startBtn.style.display = 'none'; 
        holdBtn.style.display = 'none'; 
        playAgain.style.display = 'inline-block'; 
        playAgain.style.backgroundColor = 'var(--gold)';//nog nodig?
        coins = coins - 1;
        coinsEl.innerHTML = 'coins: ' + coins;
        isAlive = false;
        coinsSndFunc(); //nodig want loose?
        

    } else if ( sum === 21 ) {
        var audio = new Audio('/blackjack/sounds/win2.wav');
        audio.volume = 0.8;
        audio.play();
        messageEl.innerHTML = 'You have BLACKJACK!';
        holdBtn.style.display = 'none';
        playAgain.style.display = 'inline-block'; 
        anotherCardEl.style.display = 'none'; 
        playAgain.style.backgroundColor = 'var(--gold)';
        coins = coins + 2;
        coinsEl.innerHTML = 'coins: ' + coins;
        isAlive = false;
        coinsSndFunc();
    } 
}



//play again
function playAgainFunction() {
    btnSoundFunc();
    holdBtn.style.display = 'none';  
    playAgain.style.display = 'none'; 
    dealerCardsId.style.display = 'none'; 
    dealerPoints.innerHTML = "";
    dealerSum = 0;
    sum = 0;
    dealerAlive = false;
    isAlive = true;
    cards = [];
    deckBuilder()
    //messageEl.innerHTML = 'Would you like another card?';
    messageEl.innerHTML = '';
    removeAllChildNodes(playercardsDivEl)
    removeAllChildNodes(dealerCardsDivEl)
    fakeRand = 52;
    renderGame();
}


//remove played cards
function removeAllChildNodes(parent) {
    while ( parent.firstChild ) {
        parent.removeChild(parent.firstChild);
    }
}

//decides which player gets the drawn cards
function dealerOrPlayer() {
    if ( dealerAlive ) {
        dealerPoints.innerHTML = 'Dealers Points: ' + dealerSum;
        fakeRand = fakeRand - 1;
    } else {
        pointsEl.innerHTML = 'points: ' + sum;
        fakeRand = fakeRand - 1;
        playerContFun();
    }
}

// AUDIO FUNCTIONS
function audioFunc(){
    setTimeout(() => {
        audio.play();
    }, 100);// lijkt goed..mag nog iets beter afgesteld worden misschien*******************************
}

function coinsAudioFunc(){
    coinsAudio.play();
}

function looseSound() {
    let randomSound = Math.floor(Math.random() * 2);
    if ( randomSound == 0 ) {
        setTimeout(() => {
            loose1El.volume = 0.3;
            loose1El.play();
        }, 100);
    } else {
        setTimeout(() => {
            loose2El.volume = 0.2;
            loose2El.play();
        }, 100);
    }
    
}
//button clicks
function btnSoundFunc() {
    btnSound.volume = 0.1;
    btnSound.play();
}

//coin sounds
function coinsSndFunc() {
    let randomSound = Math.floor(Math.random() * 3);
    if ( randomSound == 0 ) {
        coinsAudio.play();
    } else if ( randomSound == 1 ) {
        coinsAudio2.play();
    } else {
        coinsAudio3.play();
    }
}

