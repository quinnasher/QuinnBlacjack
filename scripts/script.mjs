"use strict"


import * as allFunctions from "./gameFunctions.mjs";
import {calculateScore, createDeck, nFormatter} from "./gameFunctions.mjs";
import * as stakePage from "./stake.mjs";
import * as mainGameEls from "./gamePage.mjs"
import * as welcome from "./welcome.mjs"
import * as uiFunctions from "./uiFunctions.js"
import {dealerCardCtnEl, hitBtnEl, messageEl} from "./gamePage.mjs";


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


mainGameEls.hitBtnEl.addEventListener("click", function () {
    if (!isEnded) {
        let dealCard;

        while (true) {
            if (shuffledDeck.length > 1) {
                dealCard = allFunctions.dealCard(shuffledDeck)
                break
            }
            shuffledDeck = allFunctions.shuffle(deck)
        }

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


            resolveGameOutcom()
            displayDealerFullHand()
        }, 1000)
    }

});

// stand event listenre

mainGameEls.standBtnEl.addEventListener("click", function () {

    // dealer should be dealt card till atlest 17
    while (true) { // make sure the deck is not empty

        if (shuffledDeck.length > 3) {
            while (dealerScore.scoreWithAceFlexibility <= 17) {
                dealerHand.push(allFunctions.dealCard(shuffledDeck))

                calculateScore(dealerHand)
            }
        }
        shuffledDeck = allFunctions.shuffle(deck)
        break
    }

    // calculate the dealer new hand


    resolveGameOutcom(true)
})

// console.log(`isEnded is ${isEnded}`)

function displayDealerFullHand() {
    // display dealer's full hand
    if (isEnded) {
        // console.log(`is ended is ${isEnded}`)
        mainGameEls.dealerCardCtnEl.innerHTML = "";

        console.log(dealerHand.length)

        for (let i = 0; i < dealerHand.length; i++) {
            const image = document.createElement("img")
            image.src = `assets/cards/${dealerHand[i].rank}_of_${dealerHand[i].suit}.png`
            image.classList.add("mr-2rem")

            dealerCardCtnEl.appendChild(image)
        }
    }
}

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

                // calculate and display initial score
                dealerScore = allFunctions.calculateScore(dealerHand)
                playerScore = allFunctions.calculateScore(playerHand)

                // create and append card images
                const dealerImg = document.createElement("img")
                const playerImg = document.createElement("img")

                if (dealerScore.scoreWithAceFlexibility == 21) {
                    dealerImg.src = `assets/cards/${dealerHand[i].rank}_of_${dealerHand[i].suit}.png`

                } else {
                    dealerImg.src = dealerHand.length === 1 ? `assets/cards/${dealerHand[0].rank}_of_${dealerHand[0].suit}.png` : `assets/cards/card-back.png`

                }

                playerImg.src = `assets/cards/${playerHand[i].rank}_of_${playerHand[i].suit}.png`

                dealerImg.classList.add("mr-2rem")
                playerImg.classList.add("mr-2rem")

                mainGameEls.dealerCardCtnEl.appendChild(dealerImg)
                mainGameEls.playerCardCtnEl.appendChild(playerImg)
            }
            break
        }
    }


    resolveGameOutcom();
}


// Updates game display elements with scores and messages, handling ace scenarios.
function handleGameMessage(message = "") {
    // Display dealer's score, showing initial card value if game is ongoing, otherwise revealing full score
    mainGameEls.dealerScoreEl.textContent = isEnded
        ? dealerScore.scoreWithAceFlexibility
        : dealerScore.dealerFirstCardValue

    // Adjust player score display based on ace presence
    if (playerScore.hasAce) {
        mainGameEls.playerScoreEl.classList.remove("ace-score"); // Add visual indication for ace
        // Display both scores with a slash to indicate ace flexibility
        mainGameEls.playerScoreEl.textContent = playerScore.scoreWithAceFlexibility;
    } else {
        mainGameEls.playerScoreEl.classList.remove("ace-score"); // Remove ace indication if not applicable
        // Show score without ace adjustments
        mainGameEls.playerScoreEl.textContent = playerScore.scoreWithAceFlexibility;
    }

    // Update the game message element
    mainGameEls.messageEl.textContent = message;
}

/**
 * Determines the outcome of a blackjack game based on player and dealer scores, handling win/loss/push scenarios and updating game state accordingly.
 *
 * @param {boolean} stand - Optional boolean indicating whether the player has chosen to stand (default: false).
 */
function resolveGameOutcom(stand = false) {
    if (dealerScore.scoreWithAceFlexibility === 21 && playerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("push")
        balance += Number(stakePage.stakeInputEl.textContent);
        stakePage.balanceEl.forEach(element => {
            element.textContent = allFunctions.formatNumber(balance)

            console.log(balance)
            isEnded = true
        })

    } else if (dealerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("Dealer wins")
        isEnded = true

    } else if (playerScore.scoreWithAceFlexibility === 21) {

        handleGameMessage("Blackjack")
        balance += Number(stakePage.stakeInputEl.textContent) * 2
        stakePage.balanceEl.forEach(element => {
            element.textContent = allFunctions.formatNumber(balance)
        })
        isEnded = true

    } else if (stand) {
        if (playerScore.scoreWithAceFlexibility === dealerScore.scoreWithAceFlexibility) {

            handleGameMessage("Push")
            balance += Number(stakePage.stakeInputEl.textContent);
            stakePage.balanceEl.forEach(element => {
                element.textContent = allFunctions.formatNumber(balance)
            })
            console.log(balance)

            isEnded = true
        } else if (playerScore.scoreWithAceFlexibility > dealerScore.scoreWithAceFlexibility) {

            handleGameMessage("You win")
            balance += Number(stakePage.stakeInputEl.textContent) * 2
            stakePage.balanceEl.forEach(element => {
                element.textContent = allFunctions.formatNumber(balance)
            })
            console.log(balance)

            isEnded = true
        } else if (dealerScore.scoreWithAceFlexibility > 21) {

            handleGameMessage("Dealer Bust. You win")
            balance += Number(stakePage.stakeInputEl.textContent) * 2
            stakePage.balanceEl.forEach(element => {
                element.textContent = allFunctions.formatNumber(balance)
            })
            console.log(balance)

            isEnded = true

        } else {

            handleGameMessage("Dealer wins")
            isEnded = true
        }
    } else if (playerScore.scoreWithAceFlexibility > 21) { // this condition considers player hitting
        handleGameMessage("Bust")
        isEnded = true
    } else if (playerScore.scoreWithAceFlexibility < 21) {
        handleGameMessage()
    } else {
        handleGameMessage("unhandled condition") // use for debugging
    }
}
