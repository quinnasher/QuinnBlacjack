"use strict"

import * as allFunctions from "../gameFunctions.mjs";
import * as mainGameEls from "../gamePage.mjs";
import {populateDeckWithImages} from "../uiFunctions.mjs";
import {deck, setShuffledDeck, shuffledDeck} from "./deck.mjs";
import {clearHand, shuffle} from "../gameFunctions.mjs";
import {dealerHand, playerHand} from "./hand.mjs";
import {dealerScore, playerScore, setDealerScore, setPlayerScore} from "./score.mjs";
import {gameOutcome} from "./gameOutcome.mjs";
import {balance, setBalance} from "./balance.mjs";
import {setIsEnded} from "./gameBooleans.mjs";
import {updateStakeSuggestionButtonTexts} from "./stakeFunctions.mjs";

export function mainGameInit() {
    // clear hand to an empty list
    clearHand(playerHand)
    clearHand(dealerHand)
    setIsEnded(false)

    // remove initial html values
    mainGameEls.dealerCardCtnEl.innerHTML = ""
    mainGameEls.playerCardCtnEl.innerHTML = ""

    mainGameEls.messageEl.textContent = ""

    if (shuffledDeck.length > 3) {
        setShuffledDeck(shuffle(deck))
    }

    for (let i = 0; i < 2; i++) {
        playerHand.push(allFunctions.dealCard(shuffledDeck))
        dealerHand.push(allFunctions.dealCard(shuffledDeck))

        // calculate and display initial score
        setDealerScore(allFunctions.calculateScore(dealerHand))
        setPlayerScore(allFunctions.calculateScore(playerHand))

        // create and append card images
        const dealerImg = document.createElement("img")
        const playerImg = document.createElement("img")

        if (dealerScore.score === 21) {
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


    gameOutcome();

    // console.log(`The balance as at new game is: ${balance}`)
}
