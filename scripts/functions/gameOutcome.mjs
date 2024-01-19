"use strict"


import {setIsEnded} from "./gameBooleans.mjs";
import {handleGameMessage} from "./message.mjs";
import * as stakePage from "./stake.mjs";
import {dealerScore, playerScore} from "./score.mjs";
import {balance, setBalance} from "./balance.mjs";
import {nFormatter} from "./gameFunctions.mjs";

/**
 * Determines the outcome of a blackjack game based on player and dealer scores, handling win/loss/push scenarios and updating game state accordingly.
 *
 * @param {boolean} stand - Optional boolean indicating whether the player has chosen to stand (default: false).
 */
export function gameOutcome(stand = false) {
    const stake = Number(stakePage.stakeInputEl.value)

    if (dealerScore.score === 21 && playerScore.score === 21) {

        setIsEnded(true)
        handleGameMessage("push")
        setBalance(balance + stake)

    } else if (dealerScore.score === 21) {

        setIsEnded(true)
        handleGameMessage(`You lost: ₦${nFormatter(stake)}`)

    } else if (playerScore.score === 21) {

        setIsEnded(true)
        const win = Math.floor((stake / 2) + (stake * 2));
        handleGameMessage(`Blackjack! You win: ₦${nFormatter(win)}`)
        setBalance(balance + win)

    } else if (stand) {
        if (playerScore.score === dealerScore.score) {

            setIsEnded(true)
            handleGameMessage("Push")
            setBalance(balance + stake)


        } else if (playerScore.score > dealerScore.score) {

            setIsEnded(true)
            const win = Number((stake * 2).toFixed(0))
            handleGameMessage(`You win: ₦${nFormatter(win)}`)
            setBalance(balance + win)

        } else if (dealerScore.score > 21) {

            setIsEnded(true)
            const win = Number((stake * 2).toFixed(0))
            handleGameMessage(`you win: ${nFormatter(win)}`)
            setBalance(balance + win)

        } else {

            setIsEnded(true)
            handleGameMessage(`you lose: ₦${nFormatter(stake)}`)

        }
    } else if (playerScore.score > 21) { // this condition considers player hitting

        setIsEnded(true)
        handleGameMessage(`Bust. You lose:₦ ${nFormatter(stake)}`)

    } else if (playerScore.score < 21) {
        handleGameMessage()
    } else if (playerScore > 21) {
        handleGameMessage("unhandled condition") // use for debugging
    }

    // update the UI balance
    stakePage.balanceEl.forEach(element => {
        element.textContent = `₦${nFormatter(balance)}`

    })

}
