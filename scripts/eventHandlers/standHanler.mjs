"use strict"

import {dealerCardCtnEl, dealerScoreEl, standBtnEl} from "../functions/gamePage.mjs";
import {deck, setShuffledDeck, shuffledDeck} from "../functions/deck.mjs";
import {calculateScore, dealCard, shuffle} from "../functions/gameFunctions.mjs";
import {dealerHand} from "../functions/hand.mjs";
import {dealerScore, setDealerScore} from "../functions/score.mjs";
import {gameOutcome} from "../functions/gameOutcome.mjs";
import {displayDealerFullHand} from "../functions/displayDealerFullHand.mjs";
import {isEnded, setIsEnded} from "../functions/gameBooleans.mjs";

export function standBtn() {
    standBtnEl.addEventListener("click", function () {

        if (!isEnded) {
            if (shuffledDeck.length < 3) setShuffledDeck(shuffle(deck))

            while (dealerScore.score < 17) {
                const card = dealCard(shuffledDeck)

                dealerHand.push(card)
                setDealerScore(calculateScore(dealerHand))
                dealerScoreEl.textContent = dealerScore

                const image = document.createElement("img")
                image.src = `assets/cards/${card.rank}_of_${card.suit}.png`;
                image.classList.add("mr-2rem")

                dealerCardCtnEl.appendChild(image)


            }
            setIsEnded(true)
            gameOutcome(true)
            displayDealerFullHand()

        }
    })
}