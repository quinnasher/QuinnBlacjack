"use strict"


import * as allFunctions from "./gameFunctions.mjs";
import {calculateScore, createDeck, nFormatter} from "./gameFunctions.mjs";
import * as stakePage from "./stake.mjs";
import * as mainGameEls from "./gamePage.mjs"
import * as welcome from "./welcome.mjs"
import * as uiFunctions from "./uiFunctions.js"
import {hitBtnEl} from "./gamePage.mjs";


// local variables
let balance;
let deck;
let shuffledDeck;
let playerHand = [];
let dealerHand = [];
let playerScore;
let dealerScore;
// let activePlayer
let isEnded;
let stand;
let hit;

// Game initial state
stakeInit();
gameInit()

// console.log(balance)
// Welcome section event lister
welcome.playNowBtnEl.addEventListener("click", function () {
    welcome.welcomePageEl.classList.toggle("transition-ease-out"); // Add transition class first

    setTimeout(function () {
        welcome.welcomePageEl.classList.toggle("hidden"); // Add hidden class after a delay
        stakePage.stakeCtnEl.classList.remove("hidden");
    }, 1500);
});


// Stake page event lister
stakePage.playBtnEl.addEventListener("click", function () {
    const stakeElValue = Number(stakePage.stakeInputEl.value);
    const minMax = allFunctions.betMinMax(balance);

    if (!stakeElValue) {
        stakePage.popUpEl.classList.toggle("hidden");
        stakePage.popUpContentEl.textContent = "Invalid bet amount.";
    } else if (minMax.minBet > stakeElValue) {
        // console.log(stake.minBet, stakeInputEl.value)
        stakePage.popUpEl.classList.toggle("hidden");
        stakePage.popUpContentEl.textContent = "Bet amount is too low.";
    } else if (minMax.maxBet < stakeElValue) {
        stakePage.popUpEl.classList.toggle("hidden");
        stakePage.popUpContentEl.textContent = "Bet amount is too high.";
    } else {
        balance = balance - stakeElValue;
        // hide the stake page and go to the main game page
        stakePage.stakeCtnEl.classList.toggle("hidden")
        // TODO: unhide the main game page
        mainGameEls.gameBodyEl.classList.remove("hidden")
        // update the ui balance
        stakePage.balanceEl.forEach((element) => {
            element.textContent = `Bal : ₦${allFunctions.nFormatter(balance)}`;
        });

        uiFunctions.displayStakeSuggestionBtns(balance);
        stakePage.stakeInputMinMaxValue(minMax);

        // update the input placeholder minMax values and minMax values
        stakePage.stakeInputMinMaxValue(minMax);

        stakePage.stakeInputEl.placeholder = `₦${allFunctions.nFormatter(
            minMax.minBet,
        )} - ₦${allFunctions.nFormatter(minMax.maxBet)}`;


        // update the stake value in the main game section
        mainGameEls.stakeDisplayEl.textContent = `Stake : ₦${nFormatter(stakeElValue)}`


    }
});

stakePage.clearPopUp.addEventListener("click", function () {
    stakePage.popUpEl.classList.toggle("hidden");
});

// clear stake input
stakePage.clearStakeBtn.addEventListener("click", function () {
    const minMax = allFunctions.betMinMax(balance)
    stakePage.stakeInputMinMaxValue(minMax);

    stakePage.stakeInputEl.value = "";

    stakePage.stakeInputEl.placeholder = `₦${allFunctions.nFormatter(
        minMax.minBet,
    )} - ₦${allFunctions.nFormatter(minMax.maxBet)}`;
    mainGameEls.stakeDisplayEl.textContent = `Stake :  ₦${0}`;


})
// stake button suggestions event listeners
const percent = [0.05, 0.1, 0.3, 0.4, 0.5];

for (let i = 0; i < stakePage.stakeAllBtnEl.length; i++) {
    const button = stakePage.stakeAllBtnEl[i];
    button.addEventListener("click", function () {
        stakePage.stakeInputEl.value = (percent[i] * balance).toFixed(0);
    });
}


// main game section
// restart game btn function
mainGameEls.restartEl.addEventListener("click", function () {
    // call the stakeInit function to set game initial values
    stakeInit()
    gameInit()

    // take the user to the first page
    mainGameEls.gameBodyEl.classList.toggle("hidden")
    welcome.welcomePageEl.classList.remove("hidden")
    welcome.welcomePageEl.classList.remove("transition-ease-out"); // remove transition

})

// new game btn function
mainGameEls.newGameEl.addEventListener("click", function () {
    gameInit()

    mainGameEls.gameBodyEl.classList.toggle("hidden")
    stakePage.stakeCtnEl.classList.remove("hidden")

})

// hit btn

function hitBtnHandler() {
    // deal card to the player
    const dealCard = allFunctions.dealCard(shuffledDeck)

    mainGameEls.dealCard.classList.add("deal-animation")
    mainGameEls.dealCard.classList.add("z-index-10")

    setTimeout(function () {


        let createImg = document.createElement("img")
        createImg.src = `assets/cards/${dealCard.rank}_of_${dealCard.suit}.png`

        createImg.classList.add("mr-2rem")
        mainGameEls.playerCardCtnEl.appendChild(createImg)

        mainGameEls.dealCard.classList.remove("deal-animation")  // remove this class so that it can be added again
        mainGameEls.dealCard.classList.remove("z-index-10")

        // update player hand
        playerHand.push(dealCard)

        // update player's score
        playerScore = calculateScore(playerHand)
        console.log(playerScore)
        console.log(isEnded)

        displayScore()

        if (playerScore.scoreWithAceFlexibility > 21) {
            balance -= Number(stakePage.stakeInputEl.value)
            stakePage.balanceEl.forEach(element => {
                element.textContent = String(balance)
            })

            handleGameEnd(mainGameEls.hitBtnEl, hitBtnHandler); // Call handleGameEnd inside the handler
        }


    }, 1000)
}

// mainGameEls.hitBtnEl.addEventListener("click", hitBtnHandler)


// Game initialization functions

function handleGameEnd(btn, btnHandler) {
    btn.removeEventListener("click", btnHandler)
}

function stakeInit() {
    balance = 1000000;
    const minMax = allFunctions.betMinMax(balance);
    uiFunctions.displayStakeSuggestionBtns(balance);

    stakePage.stakeInputEl.placeholder = `₦${allFunctions.nFormatter(
        minMax.minBet,
    )} - ₦${allFunctions.nFormatter(minMax.maxBet)}`;
    stakePage.stakeInputMinMaxValue(minMax);
    stakePage.balanceEl.forEach((element) => {
        element.textContent = `Bal : ₦${allFunctions.nFormatter(balance)}`;
    });
}

function gameInit() {
    // initialize boolean values
    isEnded = false;
    stand = false;
    hit = false;

    mainGameEls.hitBtnEl.addEventListener("click", hitBtnHandler);

    uiFunctions.populateDeckWithImages()
    deck = allFunctions.createDeck();
    shuffledDeck = allFunctions.shuffle(deck);


    // clear hand to an empty list
    allFunctions.clearHand(playerHand)
    allFunctions.clearHand(dealerHand)


    // remove initial html values
    mainGameEls.dealerCardCtnEl.innerHTML = ""
    mainGameEls.playerCardCtnEl.innerHTML = ""

    mainGameEls.messageEl.textContent = ""
    shuffledDeck = allFunctions.shuffle(deck)

    while (true) {
        if (shuffledDeck.length > 3) {
            for (let i = 0; i < 2; i++) {
                playerHand.push(allFunctions.dealCard(shuffledDeck))
                dealerHand.push(allFunctions.dealCard(shuffledDeck))

                // create and append card images
                const dealerImg = document.createElement("img")
                const playerImg = document.createElement("img")

                dealerImg.src = dealerHand.length === 1 ? `assets/cards/${dealerHand[0].rank}_of_diamonds.png` : `assets/cards/card-back.png`
                playerImg.src = `assets/cards/${playerHand[i].rank}_of_${playerHand[i].suit}.png`

                dealerImg.classList.add("mr-2rem")
                playerImg.classList.add("mr-2rem")

                mainGameEls.dealerCardCtnEl.appendChild(dealerImg)
                mainGameEls.playerCardCtnEl.appendChild(playerImg)
            }
            break
        }
    }

    // calculate and display initial score
    dealerScore = allFunctions.calculateScore(dealerHand)
    playerScore = allFunctions.calculateScore(playerHand)
    displayScore();
}


// Updates game display elements with scores and messages, handling ace scenarios.
function handleGameMessage(message = "") {
    // Display dealer's score, showing initial card value if game is ongoing, otherwise revealing full score
    mainGameEls.dealerScoreEl.textContent = !isEnded
        ? dealerScore.dealerFirstCardValue
        : dealerScore.scoreWithAceFlexibility;

    // Adjust player score display based on ace presence
    if (playerScore.hasAce) {
        mainGameEls.playerScoreEl.classList.add("ace-score"); // Add visual indication for ace
        // Display both scores with a slash to indicate ace flexibility
        mainGameEls.playerScoreEl.textContent = playerScore.scoreWithAceFlexibility < 21 ? `${playerScore.initialScore}/${playerScore.scoreWithAceFlexibility}` : playerScore.scoreWithAceFlexibility;
    } else {
        mainGameEls.playerScoreEl.classList.remove("ace-score"); // Remove ace indication if not applicable
        // Show score without ace adjustments
        mainGameEls.playerScoreEl.textContent = playerScore.scoreWithAceFlexibility;
    }

    // Update the game message element
    mainGameEls.messageEl.textContent = message;
}


function displayScore(stand = false) {
    if (dealerScore.scoreWithAceFlexibility === 21 && playerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("push")
        isEnded = true;
        console.log(playerScore.scoreWithAceFlexibility, dealerScore.scoreWithAceFlexibility)

    } else if (dealerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("Dealer wins")

    } else if (playerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("Blackjack")

    } else if (stand) {
        if (playerScore.scoreWithAceFlexibility === dealerScore.scoreWithAceFlexibility) {

            handleGameMessage("Push")

        } else if (playerScore.scoreWithAceFlexibility > dealerScore.scoreWithAceFlexibility) {

            handleGameMessage("You win")

        } else if (dealerScore.scoreWithAceFlexibility > 21) {

            handleGameMessage("Dealer Bust. You win")

        } else {

            handleGameMessage("Dealer wins")
        }
    } else if (playerScore.scoreWithAceFlexibility > 21) { // this condition considers player hitting

        handleGameMessage("Bust")
    } else {

        handleGameMessage()
    }
}
