"use strict"


import * as mainGameEls from "./gamePage.mjs";
import {dealerScore, playerScore} from "./score.mjs";
import {isEnded} from "./gameBooleans.mjs";

export function handleGameMessage(message = "") {
    mainGameEls.dealerScoreEl.textContent = isEnded
        ? dealerScore.score
        : dealerScore.dealerFirstCardValue

    mainGameEls.playerScoreEl.textContent = playerScore.score

    // Update the game message element
    mainGameEls.messageEl.textContent = message;
}
