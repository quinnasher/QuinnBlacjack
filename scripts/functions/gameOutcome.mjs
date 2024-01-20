"use strict"


import {setIsEnded} from "./gameBooleans.mjs";
import {handleGameMessage} from "./message.mjs";
import * as stakePage from "./stake.mjs";
import {dealerScore, playerScore} from "./score.mjs";
import {balance, setBalance} from "./balance.mjs";
import {nFormatter} from "./gameFunctions.mjs";
import {playerHand} from "./hand.mjs";

/**
 * Determines the outcome of a blackjack game based on player and dealer scores, handling win/loss/push scenarios and updating game state accordingly.
 *
 * @param {boolean} stand - Optional boolean indicating whether the player has chosen to stand (default: false).
 * @param {boolean} double
 */
export function gameOutcome(stand = false, double = false) {
    const stake = Number(stakePage.stakeInputEl.value)

    if (dealerScore.score === 21 && playerScore.score === 21) {

        setIsEnded(true)
        handleGameMessage("push")
        setBalance(balance + stake)

    } else if (dealerScore.score === 21) {

        setIsEnded(true)
        handleGameMessage(`You lost: ₦${nFormatter(stake)}`)

    } else if (playerScore.score === 21 && playerHand.length === 2) {

        setIsEnded(true)
        const win = Math.floor((stake / 2) + (stake * 2));
        handleGameMessage(`Blackjack! You win: ₦${nFormatter(win)}`)
        setBalance(balance + win)

    } else if (playerScore.score === 21) {

        setIsEnded(true)
        const win = Math.floor(stake * 2);
        handleGameMessage(`Blackjack! You win: ₦${nFormatter(win)}`)
        setBalance(balance + win)

    } else if (stand) {
        setIsEnded(true)
        if (playerScore.score === dealerScore.score) {

            handleGameMessage("Push")
            setBalance(balance + stake)


        } else if (dealerScore.score > 21) {
            const win = stake * 2;
            handleGameMessage(`you win: ₦${nFormatter(stake)}`)
            setBalance(balance + win)


        } else if (playerScore.score > dealerScore.score) {

            const win = Math.floor(stake * 2)
            handleGameMessage(`You win: ₦${nFormatter(win)}`)
            setBalance(balance + win)

        } else if (dealerScore.score > 21) {
            const win = Math.floor(stake * 2)
            handleGameMessage(`you win: ${nFormatter(win)}`)
            setBalance(balance + win)


        }
    } else if (double) {
        setIsEnded(true)

        if (playerScore.score > 21) {
            // Player wins the double
            handleGameMessage(`You lost. ₦${stake * 2}`);
            setBalance(balance - stake);

        } else if (playerScore.score === dealerScore.score) {
            // Player loses the double
            handleGameMessage("push");
            setBalance(balance + stake * 2); // Deduct stake only if the player loses
        } else if (playerScore.score > dealerScore.score) {
            const win = Math.floor(stake * 3)
            handleGameMessage(`You win. ₦${win}`);
            setBalance(balance + win);
        } else {
            handleGameMessage(`You lost. ₦${stake * 2}`);
            setBalance(balance - stake);
        }
    } else if (playerScore.score > 21) { // this condition considers player hitting

        setIsEnded(true)
        handleGameMessage(`Bust. You lose:₦ ${nFormatter(stake)}`)

    } else if (playerScore.score < 21) {
        handleGameMessage()
    } else {
        handleGameMessage("unhandled condition") // use for debugging
    }

    // update the UI balance
    stakePage.balanceEl.forEach(element => {
        element.textContent = `₦${nFormatter(balance)}`

    })

}
